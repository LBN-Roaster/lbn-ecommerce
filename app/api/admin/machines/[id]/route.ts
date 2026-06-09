import { NextResponse } from "next/server";
import { API_BASE, backendHeaders } from "../../backend";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/api/machines/${id}`, {
    headers: await backendHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Machine not found" },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/machines/${id}`, {
    method: "PUT",
    headers: await backendHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/api/machines/${id}`, {
    method: "DELETE",
    headers: await backendHeaders(),
  });
  return new NextResponse(null, { status: res.status });
}
