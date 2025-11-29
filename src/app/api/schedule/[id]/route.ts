import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
    include: {
      classType: true,
    },
  });
  return NextResponse.json(schedule);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { day, time, level, classTypeId } = await request.json();
  const updatedSchedule = await prisma.schedule.update({
    where: { id: params.id },
    data: {
      day,
      time,
      level,
      classTypeId,
    },
  });
  return NextResponse.json(updatedSchedule);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.schedule.delete({
    where: { id: params.id },
  });
  return new Response(null, { status: 204 });
}