import { NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function GET() {
  const res = await fetch(`${API_BASE}/api/products`, {
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
