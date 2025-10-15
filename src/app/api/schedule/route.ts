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
    return NextResponse.json(data.schedule);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    return NextResponse.json({ message: 'Error fetching schedule data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newScheduleItem = await request.json();
    const data = await readDb();
    
    const newItem = {
      id: data.schedule.length > 0 ? Math.max(...data.schedule.map((item: any) => item.id)) + 1 : 1,
      ...newScheduleItem,
    };

    data.schedule.push(newItem);
    await writeDb(data);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error adding new schedule item:', error);
    return NextResponse.json({ message: 'Error adding new schedule item' }, { status: 500 });
  }
}
