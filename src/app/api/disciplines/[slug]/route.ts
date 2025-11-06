import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const discipline = await prisma.discipline.findUnique({
      where: { slug },
    });

    if (!discipline) {
      return NextResponse.json({ message: 'Discipline not found' }, { status: 404 });
    }

    return NextResponse.json(discipline);
  } catch (error) {
    console.error('Error fetching discipline:', error);
    return NextResponse.json({ message: 'Failed to fetch discipline' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug: oldSlug } = params;
    const body = await request.json();
    const { name, slug, imageUrl, title, description, lenses } = body;

    if (!name || !slug || !imageUrl || !title || !description || !lenses) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const updatedDiscipline = await prisma.discipline.update({
      where: { slug: oldSlug },
      data: {
        name,
        slug,
        imageUrl,
        title,
        description,
        lenses: JSON.stringify(lenses),
      },
    });

    return NextResponse.json(updatedDiscipline);
  } catch (error) {
    console.error('Error updating discipline:', error);
    return NextResponse.json({ message: 'Failed to update discipline' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await prisma.discipline.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Discipline deleted successfully' });
  } catch (error) {
    console.error('Error deleting discipline:', error);
    return NextResponse.json({ message: 'Failed to delete discipline' }, { status: 500 });
  }
}