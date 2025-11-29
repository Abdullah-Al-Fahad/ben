import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const classTypes = await prisma.classType.findMany();
  return NextResponse.json(classTypes);
}

export async function POST(request: Request) {
  const { name, ageGroup, category } = await request.json();
  const newClassType = await prisma.classType.create({
    data: {
      name,
      ageGroup,
      category,
    },
  });
  return NextResponse.json(newClassType, { status: 201 });
}
