import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

function readDb() {
  const dbRaw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(dbRaw);
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.coaches);
}

export async function POST(request: Request) {
  const db = readDb();
  const newCoachData = await request.json();

  const newCoach = {
    id: slugify(newCoachData.name),
    name: newCoachData.name,
    title: newCoachData.title,
    disciplines: newCoachData.disciplines,
    specializations: newCoachData.specializations,
    certifications: newCoachData.certifications,
    imageUrl: newCoachData.imageUrl,
    videoUrl: newCoachData.videoUrl || '',
    bio: newCoachData.bio,
    philosophy: newCoachData.philosophy,
    achievements: newCoachData.achievements,
    gallery: newCoachData.gallery,
  };

  db.coaches.push(newCoach);
  writeDb(db);

  return NextResponse.json(newCoach, { status: 201 });
}
