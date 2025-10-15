import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

const readDb = async () => {
  const dbRaw = await fs.promises.readFile(dbPath, 'utf-8');
  return JSON.parse(dbRaw);
};

const writeDb = async (data: any) => {
  await fs.promises.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const db = await readDb();
    const program = db.programs.find((p: any) => p.id === id);

    if (program) {
      return NextResponse.json(program);
    } else {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading program:', error);
    return NextResponse.json({ message: 'Error reading program' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedProgram = await request.json();
    const db = await readDb();
    const programIndex = db.programs.findIndex((p: any) => p.id === id);

    if (programIndex !== -1) {
      db.programs[programIndex] = { ...db.programs[programIndex], ...updatedProgram, id };
      await writeDb(db);
      return NextResponse.json(db.programs[programIndex]);
    } else {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ message: 'Error updating program' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const db = await readDb();
    const initialLength = db.programs.length;
    db.programs = db.programs.filter((p: any) => p.id !== id);

    if (db.programs.length < initialLength) {
      await writeDb(db);
      return NextResponse.json({ message: 'Program deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ message: 'Error deleting program' }, { status: 500 });
  }
}
