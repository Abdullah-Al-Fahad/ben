import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const disciplines = await prisma.discipline.findMany();
    return NextResponse.json(disciplines);
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, imageUrl, title, description, lenses } = body;

    if (!name || !slug || !imageUrl || !title || !description || !lenses) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingDiscipline = await prisma.discipline.findUnique({
      where: { slug },
    });

    if (existingDiscipline) {
      return NextResponse.json({ message: 'Discipline with this slug already exists' }, { status: 409 });
    }

    const newDiscipline = await prisma.discipline.create({
      data: {
        name,
        slug,
        imageUrl,
        title,
        description,
        lenses: JSON.stringify(lenses),
      },
    });

    return NextResponse.json(newDiscipline, { status: 201 });
  } catch (error) {
    console.error('Error creating discipline:', error);
    return NextResponse.json({ message: 'Failed to create discipline', error: (error as Error).message }, { status: 500 });
  }
}