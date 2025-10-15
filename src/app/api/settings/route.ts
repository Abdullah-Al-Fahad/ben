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
    return NextResponse.json(data.settings);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    return NextResponse.json({ message: 'Error fetching settings data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newSettings = await request.json();
    const data = await readDb();
    
    data.settings = { ...data.settings, ...newSettings };
    await writeDb(data);

    return NextResponse.json(data.settings, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: 'Error updating settings' }, { status: 500 });
  }
}
