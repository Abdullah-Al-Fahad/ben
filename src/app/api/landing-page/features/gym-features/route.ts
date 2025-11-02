import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const gymFeatures = await prisma.gymFeature.findMany();
    return NextResponse.json(gymFeatures);
  } catch (error) {
    console.error('Error fetching gym features:', error);
    return NextResponse.json({ message: 'Failed to fetch gym features' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { icon, text } = await request.json();
    if (!icon || !text) {
      return NextResponse.json({ message: 'Icon and text are required' }, { status: 400 });
    }

    const gymFeature = await prisma.gymFeature.upsert({
      where: { text },
      update: { icon },
      create: { icon, text },
    });
    return NextResponse.json(gymFeature, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating gym feature:', error);
    return NextResponse.json({ message: 'Failed to create/update gym feature' }, { status: 500 });
  }
}