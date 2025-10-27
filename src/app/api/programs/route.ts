import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const programs = await prisma.program.findMany();
  return NextResponse.json(programs);
}

export async function POST(req: Request) {
  const { name, description, image } = await req.json();
  const newProgram = await prisma.program.create({
    data: {
      name,
      description,
      image,
    },
  });
  return NextResponse.json(newProgram, { status: 201 });
}
