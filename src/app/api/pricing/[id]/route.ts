import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  const fileContents = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(fileContents);
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request, { params }: { params: { id: string } }) {

  try {

    const id = params.id;

    if (id === 'null') {

        return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });

    }

    const data = await readDb();



    let pricingTier = null;

    let sectionInfo = null;

    for (const section of data.pricing) {

        const tier = section.tiers.find((t: any) => t.id === id);

        if (tier) {

            pricingTier = tier;

            sectionInfo = { id: section.id, title: section.title };

            break;

        }

    }



    if (pricingTier) {

      return NextResponse.json({ tier: pricingTier, section: sectionInfo });

    } else {

      return NextResponse.json({ message: 'Pricing tier not found' }, { status: 404 });

    }

  } catch (error) {

    console.error('Error fetching pricing tier:', error);

    return NextResponse.json({ message: 'Error fetching pricing tier' }, { status: 500 });

  }

}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
      if (id === 'null') {
        return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
      }
      const { sectionId, ...updatedTierData } = await request.json();
      const data = await readDb();
      
      if (!sectionId) {
          return NextResponse.json({ message: 'sectionId is required' }, { status: 400 });
      }

      let oldSection = null;
      let oldTierIndex = -1;

      for (const section of data.pricing) {
          const tierIndex = section.tiers.findIndex((t: any) => t.id === id);
          if (tierIndex !== -1) {
              oldSection = section;
              oldTierIndex = tierIndex;
              break;
          }
      }

      if (oldTierIndex === -1) {
        return NextResponse.json({ message: 'Pricing tier not found' }, { status: 404 });
      }

      const newSection = data.pricing.find((s: any) => s.id === sectionId);
      if (!newSection) {
        return NextResponse.json({ message: 'New section not found' }, { status: 404 });
      }

      // Remove from old section
      const [movedTier] = oldSection.tiers.splice(oldTierIndex, 1);

      // Add to new section
      newSection.tiers.push({ ...movedTier, ...updatedTierData });
  
      await writeDb(data);
  
      return NextResponse.json({ message: 'Pricing tier updated successfully' });
    } catch (error) {
      console.error('Error updating pricing tier:', error);
      return NextResponse.json({ message: 'Error updating pricing tier' }, { status: 500 });
    }
  }

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (id === 'null') {
        return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
    }
    const data = await readDb();
    
    let tierFound = false;
    for (const section of data.pricing) {
        const tierIndex = section.tiers.findIndex((t: any) => t.id === id);
        if (tierIndex !== -1) {
            section.tiers.splice(tierIndex, 1);
            tierFound = true;
            break;
        }
    }

    if (!tierFound) {
      return NextResponse.json({ message: 'Pricing tier not found' }, { status: 404 });
    }

    await writeDb(data);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting pricing tier:', error);
    return NextResponse.json({ message: 'Error deleting pricing tier' }, { status: 500 });
  }
}
