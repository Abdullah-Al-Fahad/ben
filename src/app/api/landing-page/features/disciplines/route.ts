import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const disciplines = await prisma.featureDiscipline.findMany();
    return NextResponse.json(disciplines);
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    return NextResponse.json({ message: 'Failed to fetch disciplines' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, href } = await request.json();
    if (!name || !href) {
      return NextResponse.json({ message: 'Name and href are required' }, { status: 400 });
    }

    const discipline = await prisma.featureDiscipline.upsert({
      where: { name },
      update: { href },
      create: { name, href },
    });
    return NextResponse.json(discipline, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating discipline:', error);
    return NextResponse.json({ message: 'Failed to create/update discipline' }, { status: 500 });
  }
}