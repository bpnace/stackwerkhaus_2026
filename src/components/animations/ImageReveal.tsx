import Image from "next/image";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  direction?: "left" | "right" | "up" | "down";
  parallax?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  disableOnMobile?: boolean;
  trigger?: "scroll" | "load";
  className?: string;
  imageClassName?: string;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  fetchPriority,
  className = "",
  imageClassName = "",
}: ImageRevealProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 900}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      )}
    </div>
  );
}
