// scripts/matchShiftsToWorkers.ts
import "dotenv/config";
import { createClient } from "@/lib/supabase/server";

/**
 * ShoreStaff Match Engine (Worker → Shifts)
 * - Scores each OPEN shift for every WORKER using:
 *   • Time overlap % (weight 0.6)
 *   • Role/skill match (weight 0.4)
 * - Uses availability(day_of_week, start_time, end_time) with HH:MM:SS (local time)
 * - Handles overnight availability and overnight shifts
 */

const WEIGHTS = {
  time: 0.6,
  role: 0.4,
};
const SHOW_TOP_N = 5;           // top matches per worker to print
const MIN_SCORE_TO_SHOW = 0.35; // 0–1; tweak as you like

type Shift = {
  id: string;
  role: string | null;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string;   // HH:MM:SS
  pay_rate: number | null;
  status: string;
  venues?: { id: string; name: string; address: string | null } | null;
};

type Worker = { id: string; email: string };
type Profile = { user_id: string; skills: string[] | null } | null;
type Availability = { user_id: string; day_of_week: string; start_time: string; end_time: string };

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const dayIndex = (day: string) => DAY_NAMES.findIndex(d => d.toLowerCase() === day.toLowerCase());
const nextDayIdx = (idx:number) => (idx + 1) % 7;
const prevDayIdx = (idx:number) => (idx + 6) % 7;

function timeToMin(t: string): number {
  // robust HH:MM or HH:MM:SS
  const [h, m, s] = t.split(":");
  const hh = Number(h ?? 0), mm = Number(m ?? 0), ss = Number(s ?? 0);
  return (isNaN(hh) || isNaN(mm) || isNaN(ss)) ? NaN : hh*60 + mm + Math.floor(ss/60);
}
function minutesToRange(start:number, end:number): [number, number] { return [start, end]; }
function minutesOverlap(a:[number,number], b:[number,number]) {
  const s = Math.max(a[0], b[0]);
  const e = Math.min(a[1], b[1]);
  return Math.max(0, e - s);
}

function makeTodayIntervalsFromAvailability(avails: Availability[], sDayIdx:number) {
  const byDay = new Map<number, Availability[]>();
  for (const a of avails) {
    const idx = dayIndex(a.day_of_week);
    if (idx >= 0) {
      if (!byDay.has(idx)) byDay.set(idx, []);
      byDay.get(idx)!.push(a);
    }
  }

  // Build intervals on sDay (0..1440) covered by availability
  const today: Array<[number,number]> = [];
  const next:  Array<[number,number]> = [];

  const addIntervalsForDay = (list: Availability[]|undefined, isToday:boolean) => {
    if (!list) return;
    for (const a of list) {
      const aStart = timeToMin(a.start_time);
      const aEnd   = timeToMin(a.end_time);
      if (Number.isNaN(aStart) || Number.isNaN(aEnd)) continue;

      const wraps = aEnd <= aStart; // availability crosses midnight
      if (!wraps) {
        // Same-day block
        (isToday ? today : next).push(minutesToRange(aStart, aEnd));
      } else {
        // Wraps: for its own day we cover [aStart..1440); for next day we cover [0..aEnd)
        if (isToday) today.push(minutesToRange(aStart, 1440));
        else next.push(minutesToRange(0, aEnd));
      }
    }
  };

  // Intervals that apply to the shift day (sDayIdx):
  // From sDay’s avails: non-wrap -> [start..end], wrap -> [start..1440]
  addIntervalsForDay(byDay.get(sDayIdx), true);
  // From prevDay’s wrapping avails: contribute [0..end] on sDay
  addIntervalsForDay(byDay.get(prevDayIdx(sDayIdx))?.filter(a => {
    const aStart = timeToMin(a.start_time), aEnd = timeToMin(a.end_time);
    return aEnd <= aStart; // only those that wrap into sDay
  }), false);

  return { today, next };
}

function computeShiftOverlapPctForWorker(shift: Shift, avails: Availability[]): number {
  const sDate = new Date(shift.date + "T12:00:00"); // noon avoids timezone DST issues for day-of-week
  const sDayIdx = sDate.getDay();
  const { today: availToday, next: availFromPrevWrap } = makeTodayIntervalsFromAvailability(avails, sDayIdx);
  const { today: availNextDay, next: _ } = makeTodayIntervalsFromAvailability(avails, nextDayIdx(sDayIdx));

  const sStart = timeToMin(shift.start_time);
  const sEnd   = timeToMin(shift.end_time);
  if (Number.isNaN(sStart) || Number.isNaN(sEnd)) return 0;

  const shiftWraps = sEnd <= sStart;
  // Shift portion on its own date:
  const shiftToday: Array<[number,number]> = [];
  // Portion on next date (if wraps):
  const shiftNext:  Array<[number,number]> = [];

  if (!shiftWraps) {
    shiftToday.push(minutesToRange(sStart, sEnd));
  } else {
    shiftToday.push(minutesToRange(sStart, 1440)); // from start to midnight
    shiftNext.push(minutesToRange(0, sEnd));       // from midnight to end next day
  }

  // Today overlap
  let overlapToday = 0;
  for (const st of shiftToday) {
    for (const av of availToday.concat(availFromPrevWrap)) {
      overlapToday += minutesOverlap(st, av);
    }
  }

  // Next-day overlap (only if shift wraps)
  let overlapNext = 0;
  if (shiftWraps) {
    for (const sn of shiftNext) {
      for (const av of availNextDay) {
        overlapNext += minutesOverlap(sn, av);
      }
    }
  }

  const overlap = overlapToday + overlapNext;
  const shiftDuration = !shiftWraps ? (sEnd - sStart) : (1440 - sStart) + sEnd;
  const pct = shiftDuration > 0 ? Math.min(100, Math.max(0, (overlap / shiftDuration) * 100)) : 0;
  return pct;
}

function computeRoleSkillMatch(shift: Shift, profile: Profile): number {
  const role = (shift.role ?? "").trim().toLowerCase();
  if (!role) return 0;
  const skills = (profile?.skills ?? []).map(s => s.toLowerCase());
  if (skills.includes(role)) return 1; // strong match if role in skills
  // light fuzzy: any skill containing role keyword
  if (skills.some(s => s.includes(role) || role.includes(s))) return 0.7;
  return 0;
}

async function main() {
  console.log("🤝 Building Worker → Shift matches…");

  // 1) Load OPEN shifts + venue info
  const { data: shifts, error: shErr } = await supabaseServer
    .from("shifts")
    .select("id, role, date, start_time, end_time, pay_rate, status, venue_id, venues(id,name,address)")
    .eq("status","OPEN")
    .order("date", { ascending: true }) as unknown as { data: Shift[]; error: any };

  if (shErr) { console.error("❌ Shifts query failed:", shErr); return; }
  if (!shifts || shifts.length === 0) { console.log("⚠️ No OPEN shifts found."); return; }
  console.log(`📦 Loaded ${shifts.length} open shift(s).`);

  // 2) Load workers
  const { data: workers, error: wErr } = await supabaseServer
    .from("users")
    .select("id, email, role")
    .eq("role","WORKER") as unknown as { data: Array<Worker & { role: string }>; error: any };

  if (wErr) { console.error("❌ Workers query failed:", wErr); return; }
  const workerList: Worker[] = (workers ?? []).map(w => ({ id: w.id, email: w.email }));
  if (workerList.length === 0) { console.log("⚠️ No WORKER users found."); return; }
  console.log(`👥 Loaded ${workerList.length} worker(s).`);

  // 3) Load profiles (skills) for workers
  const workerIds = workerList.map(w => w.id);
  const { data: profiles, error: pErr } = await supabaseServer
    .from("profiles")
    .select("user_id, skills")
    .in("user_id", workerIds) as unknown as { data: Profile[]; error: any };

  if (pErr) { console.error("❌ Profiles query failed:", pErr); return; }
  const profileByUser = new Map<string, Profile>();
  (profiles ?? []).forEach(p => { if (p) profileByUser.set(p.user_id, p); });

  // 4) Load availability for workers
  const { data: avails, error: aErr } = await supabaseServer
    .from("availability")
    .select("user_id, day_of_week, start_time, end_time")
    .in("user_id", workerIds) as unknown as { data: Availability[]; error: any };

  if (aErr) { console.error("❌ Availability query failed:", aErr); return; }
  const availByUser = new Map<string, Availability[]>();
  (avails ?? []).forEach(a => {
    if (!availByUser.has(a.user_id)) availByUser.set(a.user_id, []);
    availByUser.get(a.user_id)!.push(a);
  });

  // 5) Score per worker
  for (const worker of workerList) {
    const profile = profileByUser.get(worker.id) ?? null;
    const workerAvails = availByUser.get(worker.id) ?? [];

    type Scored = {
      shift: Shift;
      timePct: number;
      roleScore: number; // 0..1
      score: number;     // 0..1
      label: string;
    };

    const scored: Scored[] = [];
    for (const shift of shifts) {
      const timePct = computeShiftOverlapPctForWorker(shift, workerAvails); // 0..100
      const roleScore = computeRoleSkillMatch(shift, profile);              // 0..1

      const composite = (timePct/100)*WEIGHTS.time + roleScore*WEIGHTS.role;
      let label = "No Match ❌";
      if (timePct === 100 && roleScore >= 0.9) label = "Exact ✅";
      else if (timePct >= 75 && roleScore >= 0.7) label = "Strong 👍";
      else if (timePct >= 50 && roleScore >= 0.5) label = "Partial ⚠️";
      else if (timePct > 0) label = "Low Fit ◻️";

      scored.push({ shift, timePct, roleScore, score: composite, label });
    }

    scored.sort((a,b) => b.score - a.score);

    const top = scored.filter(s => s.score >= MIN_SCORE_TO_SHOW).slice(0, SHOW_TOP_N);
    console.log(`\n===== Matches for ${worker.email} =====`);
    if (top.length === 0) {
      console.log(" (no matches ≥ threshold)");
      continue;
    }
    for (const s of top) {
      const vName = s.shift.venues?.name ?? "Unknown Venue";
      const pct = s.timePct.toFixed(0).padStart(3," ");
      const scorePct = Math.round(s.score*100);
      console.log(
        `${s.label}  • ${scorePct}%  • Time ${pct}%  • Role ${Math.round(s.roleScore*100)}%  —  `
        + `${vName} | ${s.shift.role ?? "Role?"} | ${s.shift.date} ${s.shift.start_time}–${s.shift.end_time} | $${s.shift.pay_rate ?? 0}/hr`
      );
    }
  }

  console.log("\n✅ Match engine run complete.");
}

main().catch(e => {
  console.error("❌ Match engine crashed:", e);
  process.exit(1);
});