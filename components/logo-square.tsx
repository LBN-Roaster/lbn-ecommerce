import Image from "next/image";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  const dimension = size === "sm" ? 60 : 120;

  return (
    <Image
      src="https://lbn.com.vn/wp-content/uploads/2025/07/logo-lbn-orgina-1l.png"
      alt="LBN logo"
      width={dimension}
      height={dimension}
      className="object-contain"
    />
  );
}
