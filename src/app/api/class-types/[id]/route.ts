import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const classType = await prisma.classType.findUnique({
    where: { id },
  });
  return NextResponse.json(classType);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, ageGroup, category } = await request.json();
  const updatedClassType = await prisma.classType.update({
    where: { id },
    data: {
      name,
      ageGroup,
      category,
    },
  });
  return NextResponse.json(updatedClassType);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.classType.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}
