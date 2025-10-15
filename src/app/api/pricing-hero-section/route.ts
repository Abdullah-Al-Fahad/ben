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
    const pricingHeroSection = db.settings.pricingHeroSection || {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    };
    return NextResponse.json(pricingHeroSection);
  } catch (error) {
    console.error('Error reading pricing hero section from db.json:', error);
    return NextResponse.json({ message: 'Error fetching pricing hero section data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedHeroData = await request.json();
    const db = readDb();
    db.settings.pricingHeroSection = updatedHeroData;
    writeDb(db);
    return NextResponse.json({ message: 'Pricing Hero Section updated successfully!' });
  } catch (error) {
    console.error('Error updating pricing hero section in db.json:', error);
    return NextResponse.json({ message: 'Error updating pricing hero section' }, { status: 500 });
  }
}
