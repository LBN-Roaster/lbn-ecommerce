import { NextResponse } from "next/server";
import { API_BASE, backendHeaders } from "../../backend";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/quotations/generate`, {
    method: "POST",
    headers: await backendHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const pdf = await res.arrayBuffer();
  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="quotation.pdf"',
    },
  });
}
