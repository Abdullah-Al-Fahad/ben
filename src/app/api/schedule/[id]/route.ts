import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
  });
  if (!schedule) {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
  }
  return NextResponse.json(schedule);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { day, time, program } = await req.json();
  const updatedSchedule = await prisma.schedule.update({
    where: { id: params.id },
    data: {
      day,
      time,
      program,
    },
  });
  return NextResponse.json(updatedSchedule);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.schedule.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Schedule deleted' });
}
