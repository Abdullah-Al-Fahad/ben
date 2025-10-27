import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const coaches = await prisma.coach.findMany();
  return NextResponse.json(coaches);
}

export async function POST(req: Request) {
  const { name, bio, image, slug } = await req.json();
  const newCoach = await prisma.coach.create({
    data: {
      name,
      bio,
      image,
      slug,
    },
  });
  return NextResponse.json(newCoach, { status: 201 });
}
