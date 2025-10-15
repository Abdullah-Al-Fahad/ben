import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'db.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  const disciplines = data.programs.map((program: any) => ({ id: program.id, name: program.name }));
  return NextResponse.json(disciplines);
}
