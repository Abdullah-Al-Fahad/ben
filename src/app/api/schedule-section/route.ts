import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export async function GET() {
  try {
    const dbRaw = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(dbRaw);
    return NextResponse.json(db.settings.scheduleSection);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return NextResponse.json({ message: 'Error reading Schedule Section data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedScheduleSection = await req.json();
    const dbRaw = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(dbRaw);

    db.settings.scheduleSection = updatedScheduleSection;

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    return NextResponse.json({ message: 'Schedule Section data updated successfully', scheduleSection: updatedScheduleSection });
  } catch (error) {
    console.error('Error updating db.json:', error);
    return NextResponse.json({ message: 'Error updating Schedule Section data' }, { status: 500 });
  }
}
