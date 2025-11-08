import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const coaches = await prisma.coach.findMany();
  const formattedCoaches = coaches.map(coach => ({
    id: coach.id,
    name: coach.name,
    specialties: coach.specialties ? coach.specialties.split(',') : [],
    imageUrl: coach.image,
  }));
  return NextResponse.json(formattedCoaches);
}

export async function POST(req: Request) {
  const { name, bio, imageUrl, specialties, achievements } = await req.json();
  const newCoach = await prisma.coach.create({
    data: {
      name,
      bio,
      image: imageUrl,
      specialties,
      achievements,
    },
  });
  return NextResponse.json(newCoach, { status: 201 });
}