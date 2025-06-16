import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { search } = req.nextUrl;
    const apiUrl = `https://testing-api.ru-rating.ru/cars${search}`;

    const res = await fetch(apiUrl);

    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Ошибка от внешнего API:", res.status, text);
      return NextResponse.json(
        { error: "Ошибка получения данных с внешнего API", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 Внутренняя ошибка сервера:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
