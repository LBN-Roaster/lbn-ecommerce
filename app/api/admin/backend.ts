import { getToken } from "next-auth/jwt";
import { headers, cookies } from "next/headers";

export const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function backendHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const token = await getToken({
    req: {
      headers: Object.fromEntries(headerStore.entries()),
      cookies: Object.fromEntries(
        cookieStore.getAll().map((c) => [c.name, c.value]),
      ),
    } as any,
  });

  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (token?.backendToken) {
    h["Authorization"] = `Bearer ${token.backendToken}`;
  }
  return h;
}
