import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { search } = req.nextUrl;
  const res = await fetch(`https://testing-api.ru-rating.ru/cars${search}`);
  const data = await res.json();
  return NextResponse.json(data);
}
