import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'mock-db', 'gigs.json');

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const { gigs } = JSON.parse(data);
    
    const gig = gigs.find((g: any) => g.id === params.id);
    
    if (!gig) {
      return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
    }
    
    return NextResponse.json(gig);
  } catch (error) {
    console.error('Error reading gig:', error);
    return NextResponse.json({ error: 'Failed to read gig' }, { status: 500 });
  }
}
