import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

function readDb() {
  const dbRaw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(dbRaw);
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const db = readDb();
    const coachesHeroSection = db.settings.coachesHeroSection || {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    };
    return NextResponse.json(coachesHeroSection);
  } catch (error) {
    console.error('Error reading coaches hero section from db.json:', error);
    return NextResponse.json({ message: 'Error fetching coaches hero section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedHeroData = await request.json();
    const db = readDb();
    db.settings.coachesHeroSection = updatedHeroData;
    writeDb(db);
    return NextResponse.json({ message: 'Coaches Hero Section updated successfully!' });
  } catch (error) {
    console.error('Error updating coaches hero section in db.json:', error);
    return NextResponse.json({ message: 'Error updating coaches hero section' }, { status: 500 });
  }
}
