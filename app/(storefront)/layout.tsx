import { Navbar } from "components/layout/navbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-6">
        {children}
        <Toaster closeButton />
      </main>
    </>
  );
}
