import Image from "next/image";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  const dimension = size === "sm" ? 60 : 120;

  return (
    <Image
      src="/images/logo-lbn.png"
      alt="LBN logo"
      width={dimension}
      height={dimension}
      className="object-contain"
    />
  );
}
