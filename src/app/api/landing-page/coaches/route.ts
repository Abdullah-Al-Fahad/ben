import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const landingPage = await prisma.landingPage.findFirst();
    const coachLenses = await prisma.coachLens.findMany();

    return NextResponse.json({
      title: landingPage?.coachSectionTitle || '',
      description: landingPage?.coachSectionDescription || '',
      backgroundImage: landingPage?.coachSectionBackgroundImage || '',
      lenses: coachLenses,
    });
  } catch (error) {
    console.error('Error fetching coaches section data:', error);
    return NextResponse.json({ message: 'Failed to fetch coaches section data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, backgroundImage, lenses } = await request.json();

    if (title !== undefined && description !== undefined) {
      const landingPage = await prisma.landingPage.findFirst();
      if (landingPage) {
        await prisma.landingPage.update({
          where: { id: landingPage.id },
          data: { 
            coachSectionTitle: title, 
            coachSectionDescription: description,
            coachSectionBackgroundImage: backgroundImage 
          },
        });
      } else {
        await prisma.landingPage.create({
          data: { 
            coachSectionTitle: title, 
            coachSectionDescription: description, 
            coachSectionBackgroundImage: backgroundImage 
          },
        });
      }
    }

    if (lenses && Array.isArray(lenses)) {
      const existingLenses = await prisma.coachLens.findMany();
      const newLensesTitles = new Set(lenses.map((l: { title: string; }) => l.title));

      for (const existingLens of existingLenses) {
        if (!newLensesTitles.has(existingLens.title)) {
          await prisma.coachLens.delete({
            where: { id: existingLens.id },
          });
        }
      }

      for (const lens of lenses) {
        if (lens.title) {
          await prisma.coachLens.upsert({
            where: { title: lens.title },
            update: { subtitle: lens.subtitle },
            create: { title: lens.title, subtitle: lens.subtitle },
          });
        }
      }
    }

    return NextResponse.json({ message: 'Coaches section updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating coaches section:', error);
    return NextResponse.json({ message: 'Failed to update coaches section' }, { status: 500 });
  }
}
