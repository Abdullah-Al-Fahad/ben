import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  const fileContents = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(fileContents);
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const data = await readDb();
    return NextResponse.json(data.pricing);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    return NextResponse.json({ message: 'Error fetching pricing data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { sectionId, newSectionTitle, tier } = await request.json();
    const data = await readDb();

    if (!sectionId || !tier) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    let section = data.pricing.find((s: any) => s.id === sectionId);

    if (section) {
      // Add to existing section
      section.tiers.push(tier);
    } else {
      // Create new section
      if (!newSectionTitle) {
        return NextResponse.json({ message: 'newSectionTitle is required for a new section' }, { status: 400 });
      }
      const newSection = {
        id: sectionId,
        title: newSectionTitle,
        tiers: [tier]
      };
      data.pricing.push(newSection);
    }

    await writeDb(data);

    return NextResponse.json(tier, { status: 201 });
  } catch (error) {
    console.error('Error adding new pricing tier:', error);
    return NextResponse.json({ message: 'Error adding new pricing tier' }, { status: 500 });
  }
}
