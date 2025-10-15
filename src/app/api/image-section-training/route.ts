import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export async function GET() {
  try {
    const dbRaw = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(dbRaw);
    return NextResponse.json(db.settings.imageSectionTraining);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return NextResponse.json({ message: 'Error reading Image Section Training data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedImageSectionTraining = await req.json();
    const dbRaw = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(dbRaw);

    db.settings.imageSectionTraining = updatedImageSectionTraining;

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    return NextResponse.json({ message: 'Image Section Training data updated successfully', imageSectionTraining: updatedImageSectionTraining });
  } catch (error) {
    console.error('Error updating db.json:', error);
    return NextResponse.json({ message: 'Error updating Image Section Training data' }, { status: 500 });
  }
}
