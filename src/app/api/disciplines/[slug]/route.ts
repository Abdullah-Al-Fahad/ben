import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const discipline = await prisma.discipline.findUnique({
    where: { slug: params.slug },
  });
  if (!discipline) {
    return NextResponse.json({ error: 'Discipline not found' }, { status: 404 });
  }
  return NextResponse.json(discipline);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { name, slug, heroImage, heroTitle, description, sections } = await req.json();
  const updatedDiscipline = await prisma.discipline.update({
    where: { slug: params.slug },
    data: {
      name,
      slug,
      heroImage,
      heroTitle,
      description,
      sections,
    },
  });
  return NextResponse.json(updatedDiscipline);
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await prisma.discipline.delete({
    where: { slug: params.slug },
  });
  return NextResponse.json({ message: 'Discipline deleted' });
}
