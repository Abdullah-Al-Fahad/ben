import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  const section = await prisma.landingPageSection.findUnique({
    where: { name: params.name },
  });
  if (!section) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }
  return NextResponse.json(section);
}

export async function PUT(
  req: Request,
  { params }: { params: { name: string } }
) {
  const { content } = await req.json();
  const updatedSection = await prisma.landingPageSection.update({
    where: { name: params.name },
    data: {
      content,
    },
  });
  return NextResponse.json(updatedSection);
}

export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  await prisma.landingPageSection.delete({
    where: { name: params.name },
  });
  return NextResponse.json({ message: 'Section deleted' });
}
