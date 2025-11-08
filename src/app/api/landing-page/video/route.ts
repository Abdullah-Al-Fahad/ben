
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const video = await prisma.video.findFirst(); // Assuming we want the first video for the landing page
    if (video) {
      return NextResponse.json({ videoUrl: video.url });
    } else {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields: videoUrl" },
        { status: 400 }
      );
    }

    let video;
    const existingVideo = await prisma.video.findFirst();

    if (existingVideo) {
      video = await prisma.video.update({
        where: { id: existingVideo.id },
        data: { url: videoUrl },
      });
    } else {
      video = await prisma.video.create({
        data: { url: videoUrl },
      });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
