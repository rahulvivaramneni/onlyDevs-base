import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "server", "gigs.json");

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    const { gigs } = JSON.parse(data);
    const gig = gigs.find((g: any) => g.id === params.id);

    if (!gig) {
      return NextResponse.json({ error: "Gig not found" }, { status: 404 });
    }

    return NextResponse.json(gig);
  } catch (error) {
    console.error("Error reading gig:", error);
    return NextResponse.json({ error: "Failed to read gig" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();

    // Read current gigs
    const data = fs.readFileSync(DB_PATH, "utf8");
    const { gigs } = JSON.parse(data);

    // Find and update gig
    const gigIndex = gigs.findIndex((gig: any) => gig.id === params.id);
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