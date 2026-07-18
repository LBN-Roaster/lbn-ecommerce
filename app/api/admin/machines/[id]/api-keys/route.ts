import { NextResponse } from "next/server";
import { API_BASE, backendHeaders } from "../../../backend";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/api/machines/${id}/api-keys`, {
    method: "POST",
    headers: await backendHeaders(),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
