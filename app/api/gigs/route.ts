import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "mock-db", "gigs.json");

export async function GET() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    const gigs = JSON.parse(data);
    return NextResponse.json(gigs);
  } catch (error) {
    console.error("Error reading gigs:", error);
    return NextResponse.json({ error: "Failed to read gigs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newGig = await request.json();

    // Read current gigs
    const data = fs.readFileSync(DB_PATH, "utf8");
    const { gigs } = JSON.parse(data);

    // Create default mentor for new gigs
    const defaultMentor = {
      id: `default-${Date.now()}`,
      name: "DevHelper",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=devhelper-${Date.now()}`,
      rating: 4.5,
      message:
        "I'm here to help you solve this issue! I specialize in debugging and have helped many developers overcome similar challenges.",
      specialties: ["Debugging", "Problem Solving", "General Development"],
      baseReputation: Math.floor(Math.random() * 2000) + 1000, // Random reputation between 1000-3000
      completedGigs: Math.floor(Math.random() * 50) + 10, // Random completed gigs between 10-60
      baseName: `devhelper${Math.floor(Math.random() * 1000)}.dev`, // Random Base name
    };

    // Add new gig with proper ID and timestamp
    const gigWithId = {
      ...newGig,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      mentors: [defaultMentor], // Always include at least one default mentor
    };

    // Add to gigs array
    gigs.unshift(gigWithId);

    // Write back to file
    fs.writeFileSync(DB_PATH, JSON.stringify({ gigs }, null, 2));

    return NextResponse.json(gigWithId);
  } catch (error) {
    console.error("Error creating gig:", error);
    return NextResponse.json(
      { error: "Failed to create gig" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = await request.json();

    // Read current gigs
    const data = fs.readFileSync(DB_PATH, "utf8");
    const { gigs } = JSON.parse(data);

    // Find and update gig
    const gigIndex = gigs.findIndex((gig: any) => gig.id === id);
    if (gigIndex === -1) {
      return NextResponse.json({ error: "Gig not found" }, { status: 404 });
    }

    gigs[gigIndex] = { ...gigs[gigIndex], ...updates };

    // Write back to file
    fs.writeFileSync(DB_PATH, JSON.stringify({ gigs }, null, 2));

    return NextResponse.json(gigs[gigIndex]);
  } catch (error) {
    console.error("Error updating gig:", error);
    return NextResponse.json(
      { error: "Failed to update gig" },
      { status: 500 }
    );
  }
}
