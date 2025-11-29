import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const schedule = await prisma.schedule.findMany({
    include: {
      classType: true,
    },
  });
  return NextResponse.json(schedule);
}

export async function POST(request: Request) {
  const { day, time, level, classTypeId } = await request.json();
  const newSchedule = await prisma.schedule.create({
    data: {
      day,
      time,
      level,
      classTypeId,
    },
  });
  return NextResponse.json(newSchedule);
}