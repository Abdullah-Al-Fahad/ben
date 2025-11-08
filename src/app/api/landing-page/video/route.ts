
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const videoSection = await prisma.landingPageSection.findUnique({
      where: {
        name: "video",
      },
    });
    if (videoSection) {
      return NextResponse.json(videoSection);
    } else {
      return NextResponse.json({ content: "{}" }, { status: 404 });
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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const content = JSON.stringify({ videoUrl });

    const updatedSection = await prisma.landingPageSection.upsert({
      where: { name: "video" },
      update: { content },
      create: { name: "video", content },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
