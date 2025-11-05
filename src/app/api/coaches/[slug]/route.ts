import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const coach = await prisma.coach.findUnique({
    where: { slug: params.slug },
  });
  if (!coach) {
    return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
  }

  const coachDetails = {
    ...coach,
    bio: coach.bio ? coach.bio.split('\n') : [],
    specialties: coach.specialties ? coach.specialties.split(',') : [],
    achievements: coach.achievements ? coach.achievements.split(',') : [],
    imageUrl: coach.image, // mapping image to imageUrl
  };

  return NextResponse.json(coachDetails);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { name, bio, image, slug, specialties, achievements } = await req.json();
  const updatedCoach = await prisma.coach.update({
    where: { slug: params.slug },
    data: {
      name,
      bio: bio.join('\n'),
      image,
      slug,
      specialties: specialties.join(','),
      achievements: achievements.join(','),
    },
  });
  return NextResponse.json(updatedCoach);
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await prisma.coach.delete({
    where: { slug: params.slug },
  });
  return NextResponse.json({ message: 'Coach deleted' });
}
