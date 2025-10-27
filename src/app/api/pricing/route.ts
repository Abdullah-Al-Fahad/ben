import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const pricing = await prisma.pricing.findMany();
  return NextResponse.json(pricing);
}

export async function POST(req: Request) {
  const { name, price, features, type } = await req.json();
  const newPricing = await prisma.pricing.create({
    data: {
      name,
      price,
      features,
      type,
    },
  });
  return NextResponse.json(newPricing, { status: 201 });
}
