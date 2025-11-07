import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function seedVenueAndShift() {
  try {
    // Find employer user (Christy Kettering)
    const { data: employerData, error: employerError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'christy.kettering@example.com')
      .single();

    if (employerError || !employerData) {
      console.error("❌ Employer user not found:", employerError);
      return;
    }
    const employerId = employerData.id;

    // Insert venues linked to employer
    const venuesToInsert = [
      {
        name: "The Coastal Grill",
        address: "123 Ocean Ave, Seaside Town",
        pay_range: "$15-$25",
        perks: "Free meals, Employee discounts",
        user_id: employerId,
      },
      {
        name: "Harbor House Tavern",
        address: "456 Dock St, Bay City",
        pay_range: "$18-$28",
        perks: "Tips, Flexible hours",
        user_id: employerId,
      },
    ];

    const { data: insertedVenues, error: venueError } = await supabase
      .from('venues')
      .insert(venuesToInsert)
      .select();

    if (venueError) {
      console.error("❌ Error inserting venues:", venueError);
      return;
    }

    // Insert multiple workers into users and profiles
    const workers = [
      {
        email: "alice.smith@example.com",
        password: "password123", // For demonstration only; use proper hashing in production
        profile: {
          full_name: "Alice Smith",
          role: "Bartender",
          skills: ["Mixology", "Customer Service", "POS"],
          focus_roles: ["Bartender"],
        },
      },
      {
        email: "bob.johnson@example.com",
        password: "password123",
        profile: {
          full_name: "Bob Johnson",
          role: "Server",
          skills: ["Serving", "Multitasking", "Customer Service"],
          focus_roles: ["Server"],
        },
      },
      {
        email: "carla.martinez@example.com",
        password: "password123",
        profile: {
          full_name: "Carla Martinez",
          role: "Cook",
          skills: ["Grilling", "Prep Work", "Food Safety"],
          focus_roles: ["Cook"],
        },
      },
      {
        email: "daniel.lee@example.com",
        password: "password123",
        profile: {
          full_name: "Daniel Lee",
          role: "Host",
          skills: ["Greeting", "Reservation Management", "Customer Service"],
          focus_roles: ["Host"],
        },
      },
    ];

    const insertedWorkers = [];

    for (const worker of workers) {
      // Insert user
      const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email: worker.email,
        password: worker.password,
        email_confirm: true,
      });

      if (userError) {
        console.error(`❌ Error creating user ${worker.email}:`, userError);
        continue;
      }

      // Insert profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userData.user.id,
          full_name: worker.profile.full_name,
          role: worker.profile.role,
          skills: worker.profile.skills,
          focus_roles: worker.profile.focus_roles,
        });

      if (profileError) {
        console.error(`❌ Error inserting profile for ${worker.email}:`, profileError);
        continue;
      }

      insertedWorkers.push({ user: userData.user, profile: profileData });
    }

    // Insert shifts linked to venues with varied times, roles, and pay rates
    // Use the inserted venues to get their IDs
    const venueMap = insertedVenues.reduce((map, venue) => {
      map[venue.name] = venue.id;
      return map;
    }, {} as Record<string, string>);

    const shiftsToInsert = [
      {
        venue_id: venueMap["The Coastal Grill"],
        role: "Bartender",
        date: "2025-11-10",
        start_time: "16:00:00",
        end_time: "22:00:00",
        pay_rate: 22,
        description: "Evening shift, busy weekend",
        status: "OPEN",
        positions_open: 2,
        experience_level: "Intermediate",
      },
      {
        venue_id: venueMap["The Coastal Grill"],
        role: "Server",
        date: "2025-11-11",
        start_time: "15:00:00",
        end_time: "21:00:00",
        pay_rate: 18,
        description: "Afternoon to evening shift",
        status: "OPEN",
        positions_open: 3,
        experience_level: "Entry",
      },
      {
        venue_id: venueMap["The Coastal Grill"],
        role: "Cook",
        date: "2025-11-12",
        start_time: "14:00:00",
        end_time: "20:00:00",
        pay_rate: 20,
        description: "Prep and dinner service",
        status: "OPEN",
        positions_open: 1,
        experience_level: "Advanced",
      },
      {
        venue_id: venueMap["Harbor House Tavern"],
        role: "Bartender",
        date: "2025-11-13",
        start_time: "17:00:00",
        end_time: "23:00:00",
        pay_rate: 25,
        description: "Friday night shift",
        status: "OPEN",
        positions_open: 2,
        experience_level: "Intermediate",
      },
      {
        venue_id: venueMap["Harbor House Tavern"],
        role: "Server",
        date: "2025-11-14",
        start_time: "16:00:00",
        end_time: "22:00:00",
        pay_rate: 19,
        description: "Weekend coverage",
        status: "OPEN",
        positions_open: 2,
        experience_level: "Entry",
      },
      {
        venue_id: venueMap["Harbor House Tavern"],
        role: "Host",
        date: "2025-11-15",
        start_time: "15:00:00",
        end_time: "21:00:00",
        pay_rate: 18,
        description: "Managing reservations and seating",
        status: "OPEN",
        positions_open: 1,
        experience_level: "Entry",
      },
      {
        venue_id: venueMap["The Coastal Grill"],
        role: "Cook",
        date: "2025-11-16",
        start_time: "12:00:00",
        end_time: "18:00:00",
        pay_rate: 21,
        description: "Lunch and prep shift",
        status: "OPEN",
        positions_open: 1,
        experience_level: "Advanced",
      },
      {
        venue_id: venueMap["Harbor House Tavern"],
        role: "Server",
        date: "2025-11-17",
        start_time: "14:00:00",
        end_time: "20:00:00",
        pay_rate: 20,
        description: "Afternoon shift",
        status: "OPEN",
        positions_open: 2,
        experience_level: "Intermediate",
      },
      {
        venue_id: venueMap["The Coastal Grill"],
        role: "Host",
        date: "2025-11-18",
        start_time: "15:00:00",
        end_time: "21:00:00",
        pay_rate: 17,
        description: "Front door greeting and seating",
        status: "OPEN",
        positions_open: 1,
        experience_level: "Entry",
      },
      {
        venue_id: venueMap["Harbor House Tavern"],
        role: "Cook",
        date: "2025-11-19",
        start_time: "13:00:00",
        end_time: "19:00:00",
        pay_rate: 22,
        description: "Dinner prep and cooking",
        status: "OPEN",
        positions_open: 1,
        experience_level: "Advanced",
      },
    ];

    const { data: insertedShifts, error: shiftError } = await supabase
      .from('shifts')
      .insert(shiftsToInsert)
      .select();

    if (shiftError) {
      console.error("❌ Error inserting shifts:", shiftError);
      return;
    }

    console.log(`✅ Inserted ${insertedWorkers.length} workers.`);
    insertedWorkers.forEach(({ user, profile }) => {
      console.log(`- ${profile[0].full_name} (${user.email}), Role: ${profile[0].role}`);
    });

    console.log(`✅ Inserted ${insertedVenues.length} venues.`);
    insertedVenues.forEach(venue => {
      console.log(`- ${venue.name} at ${venue.address}`);
    });

    console.log(`✅ Inserted ${insertedShifts.length} shifts.`);
    insertedShifts.forEach(shift => {
      console.log(`- ${shift.role} at venue ID ${shift.venue_id} on ${shift.date} from ${shift.start_time} to ${shift.end_time} ($${shift.pay_rate}/hr)`);
    });

  } catch (error) {
    console.error("❌ Unexpected error during seeding:", error);
  }
}

seedVenueAndShift();