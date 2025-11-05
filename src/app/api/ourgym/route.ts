
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const ourGym = await prisma.ourGym.findFirst();
    return NextResponse.json(ourGym);
  } catch (error) {
    console.error('[OURGYM_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !content || !imageUrl) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const ourGym = await prisma.ourGym.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(ourGym);
  } catch (error) {
    console.error('[OURGYM_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, imageUrl } = body;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const ourGym = await prisma.ourGym.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(ourGym);
  } catch (error) {
    console.error('[OURGYM_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
