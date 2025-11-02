
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const secondHero = await prisma.secondHero.findFirst();
  return NextResponse.json(secondHero);
}

export async function PUT(request: Request) {
  const data = await request.json();
  console.log('data', data);
  const secondHero = await prisma.secondHero.findFirst();
  console.log('secondHero', secondHero);
  if (secondHero) {
    try {
      const updatedSecondHero = await prisma.secondHero.update({
        where: { id: secondHero.id },
        data,
      });
      return NextResponse.json(updatedSecondHero);
    } catch (error) {
      console.error('Error updating second hero:', error);
      return NextResponse.json({ error: 'Error updating second hero' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Second hero not found' }, { status: 404 });
  }
}
