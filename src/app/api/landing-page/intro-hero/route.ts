import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const introHeroSection = await prisma.landingPageSection.findUnique({
      where: {
        name: "intro-hero",
      },
    });
    if (introHeroSection) {
      return NextResponse.json(introHeroSection);
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
    const { heroText, videoUrl } = body;

    if (!heroText || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const content = JSON.stringify({ heroText, videoUrl });

    const updatedSection = await prisma.landingPageSection.upsert({
      where: { name: "intro-hero" },
      update: { content },
      create: { name: "intro-hero", content },
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
