import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const pricing = await prisma.pricing.findUnique({
    where: { id: params.id },
  });
  if (!pricing) {
    return NextResponse.json({ error: 'Pricing not found' }, { status: 404 });
  }
  return NextResponse.json(pricing);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, price, features, type } = await req.json();
  const updatedPricing = await prisma.pricing.update({
    where: { id: params.id },
    data: {
      name,
      price,
      features,
      type,
    },
  });
  return NextResponse.json(updatedPricing);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.pricing.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Pricing deleted' });
}
