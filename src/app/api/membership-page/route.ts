import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

export async function GET() {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return NextResponse.json(dbData.membershipPage);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    return NextResponse.json({ error: 'Failed to fetch membership page data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    dbData.membershipPage = newData;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    return NextResponse.json({ message: 'Membership page data updated successfully' });
  } catch (error) {
    console.error('Error updating db.json:', error);
    return NextResponse.json({ error: 'Failed to update membership page data' }, { status: 500 });
  }
}
