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

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
      const slug = params.slug;
      console.log('API: Received coach slug:', slug);
      const data = await readDb();
      console.log('API: Coaches in db.json:', data.coaches);
      
      const coach = data.coaches.find((c: any) => c.id === slug);
  
      if (!coach) {
        console.log('API: Coach not found for slug:', slug);
        return NextResponse.json({ message: 'Coach not found' }, { status: 404 });
      }
  
      return NextResponse.json(coach);
    } catch (error) {
      console.error('Error fetching coach:', error);
      return NextResponse.json({ message: 'Error fetching coach' }, { status: 500 });
    }
  }

export async function PUT(request: Request, { params }: { params: { slug: string } }) {

    try {

      const slug = params.slug;

      const updatedCoachData = await request.json();

      const data = await readDb();

      

      const coachIndex = data.coaches.findIndex((c: any) => c.id === slug);

  

      if (coachIndex === -1) {

        return NextResponse.json({ message: 'Coach not found' }, { status: 404 });

      }

      const existingCoach = data.coaches[coachIndex];

      let newId = existingCoach.id;

      if (updatedCoachData.name && updatedCoachData.name !== existingCoach.name) {

        newId = slugify(updatedCoachData.name);

      }



      const finalUpdatedCoach = { ...existingCoach, ...updatedCoachData, id: newId };



      if (newId !== existingCoach.id) {

        // Remove the old entry and add the new one with the updated ID

        data.coaches.splice(coachIndex, 1);

        data.coaches.push(finalUpdatedCoach);

      } else {

        // Update the existing entry

        data.coaches[coachIndex] = finalUpdatedCoach;

      }



      await writeDb(data);

  

      return NextResponse.json(finalUpdatedCoach);

    } catch (error) {

      console.error('Error updating coach:', error);

      return NextResponse.json({ message: 'Error updating coach' }, { status: 500 });

    }

  }

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const data = await readDb();
    
    const coachIndex = data.coaches.findIndex((c: any) => c.id === slug);

    if (coachIndex === -1) {
      return NextResponse.json({ message: 'Coach not found' }, { status: 404 });
    }

    data.coaches.splice(coachIndex, 1);
    await writeDb(data);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting coach:', error);
    return NextResponse.json({ message: 'Error deleting coach' }, { status: 500 });
  }
}
