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
    return NextResponse.json(db.disciplinesHeroSection);
  } catch (error) {
    console.error('Error reading disciplinesHeroSection:', error);
    return NextResponse.json({ message: 'Error reading disciplines hero section' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedSection = await request.json();
    const db = await readDb();
    db.disciplinesHeroSection = updatedSection;
    await writeDb(db);
    return NextResponse.json(db.disciplinesHeroSection);
  } catch (error) {
    console.error('Error updating disciplinesHeroSection:', error);
    return NextResponse.json({ message: 'Error updating disciplines hero section' }, { status: 500 });
  }
}
