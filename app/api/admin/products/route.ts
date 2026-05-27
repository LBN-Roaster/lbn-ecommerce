import { NextResponse } from "next/server";
import { API_BASE, backendHeaders } from "../backend";

export async function GET() {
  const res = await fetch(`${API_BASE}/api/products`, {
    headers: await backendHeaders(),
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: await backendHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
