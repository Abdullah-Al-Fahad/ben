
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const pricingPdf = await prisma.pricingPdf.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(pricingPdf);
  } catch (error) {
    console.error('Failed to fetch pricing PDF URL:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing PDF URL' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'A PDF file must be provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const sanitizedFilename = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, sanitizedFilename);
    await fs.promises.writeFile(filePath, buffer);
    const pdfUrl = `/uploads/${sanitizedFilename}`;

    const newPricingPdf = await prisma.pricingPdf.create({
      data: {
        url: pdfUrl,
      },
    });

    return NextResponse.json(newPricingPdf);
  } catch (error) {
    console.error('Failed to save pricing PDF:', error);
    return NextResponse.json({ error: 'Failed to save pricing PDF' }, { status: 500 });
  }
}
