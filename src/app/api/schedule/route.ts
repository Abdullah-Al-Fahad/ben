import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const schedule = await prisma.schedule.findMany();
  return NextResponse.json(schedule);
}

export async function POST(req: Request) {
  const { day, time, program } = await req.json();
  const newSchedule = await prisma.schedule.create({
    data: {
      day,
      time,
      program,
    },
  });
  return NextResponse.json(newSchedule, { status: 201 });
}
