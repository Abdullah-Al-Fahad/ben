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

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.programs);
  } catch (error) {
    console.error('Error reading programs:', error);
    return NextResponse.json({ message: 'Error reading programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProgram = await request.json();
    const db = await readDb();

    // Generate a simple slug from the name for the ID
    const slug = newProgram.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
    newProgram.id = slug;

    db.programs.push(newProgram);
    await writeDb(db);

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ message: 'Error creating program' }, { status: 500 });
  }
}
