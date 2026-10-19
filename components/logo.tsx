import Image from "next/image";

export function Logo({ compact = false, alt = "Built2Perform" }: { compact?: boolean; alt?: string }) {
  const height = compact ? 32 : 44;

  return (
    <Image
      src="/media/logo-white.png"
      alt={alt}
      width={1024}
      height={192}
      priority={compact}
      className="w-auto"
      style={{ height, width: "auto" }}
    />
  );
}
