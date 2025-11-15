
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

export async function GET(request: Request, { params }: { params: { filename: string[] } }) {
  const filename = params.filename.join('/');
  const filePath = path.join(process.cwd(), 'uploads', filename);

  try {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const mimeType = mime.lookup(filePath) || 'application/octet-stream';
      
      const headers = new Headers();
      headers.set('Content-Type', mimeType);

      return new NextResponse(fileBuffer, { status: 200, headers });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to serve file:', error);
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}
