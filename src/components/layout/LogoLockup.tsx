import Image from "next/image";

interface LogoLockupProps {
  className?: string;
}

export function LogoLockup({ className = "" }: LogoLockupProps) {
  return (
    <div className={`relative h-16 w-48 ${className}`} aria-label="STACKWERKHAUS">
      <Image
        src="/images/logos/SKWKHS.svg"
        alt="STACKWERKHAUS"
        fill
        sizes="192px"
        priority
        className="object-contain object-left"
      />
    </div>
  );
}
