import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const disciplines = await prisma.discipline.findMany();
  return NextResponse.json(disciplines);
}

export async function POST(req: Request) {
  const { name, slug, heroImage, heroTitle, description, sections } = await req.json();
  const newDiscipline = await prisma.discipline.create({
    data: {
      name,
      slug,
      heroImage,
      heroTitle,
      description,
      sections,
    },
  });
  return NextResponse.json(newDiscipline, { status: 201 });
}
