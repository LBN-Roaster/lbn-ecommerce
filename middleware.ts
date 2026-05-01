import { NextRequest, NextResponse } from "next/server";

const REALM = "LBN Admin";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"` },
  });
}

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  const maxLen = Math.max(ab.byteLength, bb.byteLength);
  const a2 = new Uint8Array(maxLen);
  const b2 = new Uint8Array(maxLen);
  a2.set(ab);
  b2.set(bb);
  // XOR all bytes including length difference — always runs full loop
  let diff = ab.byteLength ^ bb.byteLength;
  for (let i = 0; i < maxLen; i++) diff |= a2[i]! ^ b2[i]!;
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) return unauthorized();

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let user: string;
  let pass: string;
  try {
    const decoded = atob(header.slice("Basic ".length));
    const idx = decoded.indexOf(":");
    if (idx < 0) return unauthorized();
    user = decoded.slice(0, idx);
    pass = decoded.slice(idx + 1);
  } catch {
    return unauthorized();
  }

  if (!safeEqual(user, expectedUser) || !safeEqual(pass, expectedPass))
    return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
