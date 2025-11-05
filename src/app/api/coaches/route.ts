import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const coaches = await prisma.coach.findMany();
  const formattedCoaches = coaches.map(coach => ({
    slug: coach.slug,
    name: coach.name,
    specialties: coach.specialties ? coach.specialties.split(',') : [],
    imageUrl: coach.image,
  }));
  return NextResponse.json(formattedCoaches);
}

export async function POST(req: Request) {
  const { name, bio, image, slug, specialties, achievements } = await req.json();
  const newCoach = await prisma.coach.create({
    data: {
      name,
      bio: bio.join('\n'),
      image,
      slug,
      specialties: specialties.join(','),
      achievements: achievements.join(','),
    },
  });
  return NextResponse.json(newCoach, { status: 201 });
}