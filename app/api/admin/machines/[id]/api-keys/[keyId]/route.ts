import { NextResponse } from "next/server";
import { API_BASE, backendHeaders } from "../../../../backend";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; keyId: string }> },
) {
  const { id, keyId } = await params;
  const res = await fetch(`${API_BASE}/api/machines/${id}/api-keys/${keyId}`, {
    method: "DELETE",
    headers: await backendHeaders(),
  });
  return new NextResponse(null, { status: res.status });
}
