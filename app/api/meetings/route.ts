import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const meetings = getMeetings(date);

  return NextResponse.json(meetings);
}