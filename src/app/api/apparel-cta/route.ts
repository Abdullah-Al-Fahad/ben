import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const apparelCTA = await prisma.apparelCTA.findFirst();
    return NextResponse.json(apparelCTA);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const apparelCTA = await prisma.apparelCTA.create({ data });
    return NextResponse.json(apparelCTA);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const apparelCTA = await prisma.apparelCTA.findFirst();
    if (!apparelCTA) {
      return new NextResponse('Not Found', { status: 404 });
    }
    const updatedApparelCTA = await prisma.apparelCTA.update({
      where: { id: apparelCTA.id },
      data,
    });
    return NextResponse.json(updatedApparelCTA);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
