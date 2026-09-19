import { NextRequest, NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return NextResponse.json(
      { error: "Invalid meeting id" },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json(
      { error: "Meeting not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}