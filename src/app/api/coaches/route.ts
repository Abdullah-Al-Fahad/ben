import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function cleanImageUrl(url: string): string {
  if (!url) return url;

  // If it's an external URL, return as is (after stripping potential ?v=...)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.split('?')[0];
  }

  // For local paths, extract just the filename
  // This handles paths like 'filename.ext', '/filename.ext', '/uploads/filename.ext', '/api/images/filename.ext'
  const lastSlashIndex = url.lastIndexOf('/');
  let filename = url;
  if (lastSlashIndex !== -1) {
    filename = url.substring(lastSlashIndex + 1);
  }
  
  // Remove any ?v=... from the filename
  filename = filename.split('?')[0];

  return filename;
}

export async function GET() {
  const coaches = await prisma.coach.findMany();
  const formattedCoaches = coaches.map(coach => {
    let finalImageUrl = coach.image;
    // If the image URL is not an absolute URL, construct a relative one.
    if (finalImageUrl && !finalImageUrl.startsWith('http')) {
      finalImageUrl = `/api/images/${finalImageUrl}`;
    }

    return {
      id: coach.id,
      name: coach.name,
      specialties: coach.specialties ? coach.specialties.split(',') : [],
      imageUrl: finalImageUrl,
    };
  });
  return NextResponse.json(formattedCoaches);
}

export async function POST(req: Request) {
  const { name, bio, imageUrl, specialties, achievements } = await req.json();
  const cleanedImageUrl = cleanImageUrl(imageUrl);
  const newCoach = await prisma.coach.create({
    data: {
      name,
      bio,
      image: cleanedImageUrl,
      specialties,
      achievements,
    },
  });
  return NextResponse.json(newCoach, { status: 201 });
}