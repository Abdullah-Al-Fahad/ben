import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const fileContents = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist, return a default structure
    if (error.code === 'ENOENT') {
      return { schedule: [] };
    }
    throw error;
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const data = await readDb();
    const scheduleItem = data.schedule.find((item: any) => item.id === id);

    if (!scheduleItem) {
      return NextResponse.json({ message: 'Schedule item not found' }, { status: 404 });
    }

    return NextResponse.json(scheduleItem);
  } catch (error) {
    console.error('Error fetching schedule item:', error);
    return NextResponse.json({ message: 'Error fetching schedule item' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const updatedItem = await request.json();
    const data = await readDb();

    const itemIndex = data.schedule.findIndex((item: any) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Schedule item not found' }, { status: 404 });
    }

    data.schedule[itemIndex] = { ...data.schedule[itemIndex], ...updatedItem };
    await writeDb(data);

    return NextResponse.json(data.schedule[itemIndex]);
  } catch (error) {
    console.error('Error updating schedule item:', error);
    return NextResponse.json({ message: 'Error updating schedule item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const data = await readDb();
    
    const itemIndex = data.schedule.findIndex((item: any) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Schedule item not found' }, { status: 404 });
    }

    data.schedule.splice(itemIndex, 1);
    await writeDb(data);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting schedule item:', error);
    return NextResponse.json({ message: 'Error deleting schedule item' }, { status: 500 });
  }
}
