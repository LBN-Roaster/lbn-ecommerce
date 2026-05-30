import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="pt-0">
        {children}
        <Toaster closeButton />
      </main>
    </>
  );
}
