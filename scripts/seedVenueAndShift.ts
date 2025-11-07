import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function seedVenueAndShift() {
  console.log("🌊 Seeding test venues, workers, and shifts...");

  // Step 1: Get test user (the one you just inserted)
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, email")
    .eq("email", "testuser@shorestaff.app")
    .single();

  if (userError || !userData) {
    console.error("❌ Could not find test user:", userError);
    return;
  }

  const userId = userData.id;
  console.log("👤 Found test user:", userData.email, userId);

  // Step 2: Insert two test venues
  const venuesToInsert = [
    {
      user_id: userId,
      name: "The Coastal Grill",
      description: "Trendy seaside restaurant known for lobster rolls and live music.",
      address: "12 Ocean Blvd, Portsmouth, NH",
      pay_range: "$18–25/hr",
      perks: "Meals included, tips shared",
      logo: "https://shorestaff.app/images/demo-venue.jpg",
    },
    {
      user_id: userId,
      name: "Harbor House Tavern",
      description: "Rustic tavern with a waterfront view and craft beers.",
      address: "45 Dockside Lane, Portsmouth, NH",
      pay_range: "$16–22/hr",
      perks: "Employee discounts, flexible hours",
      logo: "https://shorestaff.app/images/harbor-house.jpg",
    },
  ];

  const { data: venueData, error: venueError } = await supabase
    .from("venues")
    .insert(venuesToInsert)
    .select();

  if (venueError || !venueData) {
    console.error("❌ Venue insert failed:", venueError);
    return;
  }

  console.log(`🏪 Created venues: ${venueData.map(v => v.name).join(", ")}`);

  // Step 3: Insert multiple workers
  const workersToInsert = [
    {
      email: "alice@example.com",
      name: "Alice Johnson",
      role: "Bartender",
      skillset: "Cocktails, customer service, POS systems",
    },
    {
      email: "bob@example.com",
      name: "Bob Smith",
      role: "Server",
      skillset: "Friendly, fast multitasking, wine knowledge",
    },
    {
      email: "carla@example.com",
      name: "Carla Gomez",
      role: "Cook",
      skillset: "Grilling, seafood prep, kitchen safety",
    },
    {
      email: "daniel@example.com",
      name: "Daniel Lee",
      role: "Host",
      skillset: "Greeting guests, reservation management, communication",
    },
    {
      email: "emily@example.com",
      name: "Emily Davis",
      role: "Dishwasher",
      skillset: "Fast, reliable, team player",
    },
  ];

  // Insert workers if they do not exist already
  for (const worker of workersToInsert) {
    const { data: existingWorker, error: existingWorkerError } = await supabase
      .from("workers")
      .select("id")
      .eq("email", worker.email)
      .single();

    if (!existingWorker && !existingWorkerError) {
      const { error: insertError } = await supabase
        .from("workers")
        .insert(worker);
      if (insertError) {
        console.error(`❌ Failed to insert worker ${worker.email}:`, insertError);
      }
    }
  }
  console.log(`👷 Added workers: ${workersToInsert.map(w => w.name).join(", ")}`);

  // Step 4: Insert around 10 diverse shifts across both venues
  const venueMap = venueData.reduce((acc, v) => {
    acc[v.name] = v.id;
    return acc;
  }, {} as Record<string, string>);

  const shiftsToInsert = [
    {
      venue_id: venueMap["The Coastal Grill"],
      role: "Server",
      date: "2025-11-10",
      start_time: "16:00:00",
      end_time: "22:00:00",
      pay_rate: 20.00,
      description: "Dinner shift – seaside patio, high tips expected.",
      positions_open: 2,
      experience_level: "Intermediate",
      status: "OPEN",
    },
    {
      venue_id: venueMap["The Coastal Grill"],
      role: "Bartender",
      date: "2025-11-11",
      start_time: "17:00:00",
      end_time: "23:00:00",
      pay_rate: 22.00,
      description: "Evening bar shift, busy weekend crowd.",
      positions_open: 1,
      experience_level: "Advanced",
      status: "OPEN",
    },
    {
      venue_id: venueMap["The Coastal Grill"],
      role: "Cook",
      date: "2025-11-12",
      start_time: "11:00:00",
      end_time: "19:00:00",
      pay_rate: 18.50,
      description: "Lunch and dinner prep, seafood specialty.",
      positions_open: 1,
      experience_level: "Intermediate",
      status: "OPEN",
    },
    {
      venue_id: venueMap["The Coastal Grill"],
      role: "Host",
      date: "2025-11-13",
      start_time: "15:00:00",
      end_time: "21:00:00",
      pay_rate: 16.00,
      description: "Greeting guests and managing waitlist.",
      positions_open: 1,
      experience_level: "Entry",
      status: "OPEN",
    },
    {
      venue_id: venueMap["The Coastal Grill"],
      role: "Dishwasher",
      date: "2025-11-14",
      start_time: "14:00:00",
      end_time: "20:00:00",
      pay_rate: 15.00,
      description: "Kitchen cleanup and dish washing.",
      positions_open: 1,
      experience_level: "Entry",
      status: "OPEN",
    },
    {
      venue_id: venueMap["Harbor House Tavern"],
      role: "Server",
      date: "2025-11-10",
      start_time: "12:00:00",
      end_time: "18:00:00",
      pay_rate: 19.00,
      description: "Lunch shift with river view seating.",
      positions_open: 2,
      experience_level: "Intermediate",
      status: "OPEN",
    },
    {
      venue_id: venueMap["Harbor House Tavern"],
      role: "Bartender",
      date: "2025-11-11",
      start_time: "16:00:00",
      end_time: "22:00:00",
      pay_rate: 21.00,
      description: "Craft beer bar, friendly crowd.",
      positions_open: 1,
      experience_level: "Advanced",
      status: "OPEN",
    },
    {
      venue_id: venueMap["Harbor House Tavern"],
      role: "Cook",
      date: "2025-11-12",
      start_time: "10:00:00",
      end_time: "18:00:00",
      pay_rate: 17.50,
      description: "Breakfast and lunch prep, tavern specialties.",
      positions_open: 1,
      experience_level: "Intermediate",
      status: "OPEN",
    },
    {
      venue_id: venueMap["Harbor House Tavern"],
      role: "Host",
      date: "2025-11-13",
      start_time: "14:00:00",
      end_time: "20:00:00",
      pay_rate: 15.50,
      description: "Manage reservations and greet guests.",
      positions_open: 1,
      experience_level: "Entry",
      status: "OPEN",
    },
    {
      venue_id: venueMap["Harbor House Tavern"],
      role: "Dishwasher",
      date: "2025-11-14",
      start_time: "13:00:00",
      end_time: "19:00:00",
      pay_rate: 15.00,
      description: "Assist kitchen staff with cleaning duties.",
      positions_open: 1,
      experience_level: "Entry",
      status: "OPEN",
    },
  ];

  const { data: shiftData, error: shiftError } = await supabase
    .from("shifts")
    .insert(shiftsToInsert)
    .select();

  if (shiftError || !shiftData) {
    console.error("❌ Shift insert failed:", shiftError);
    return;
  }

  console.log(`📅 Created ${shiftData.length} shifts across venues.`);
  console.log("🌊 Seeding complete!");
}

seedVenueAndShift();