import clsx from "clsx";

interface LogoMarkProps {
  className?: string;
  letterClassName?: string;
  letterRefs?: Array<((el: SVGPathElement | null) => void) | undefined>;
}

export function SKWMark({
  className = "",
  letterClassName = "",
  letterRefs = [],
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 300 145"
      aria-hidden="true"
      className={clsx("block text-current", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={letterRefs[0]}
        data-logo="skw"
        data-letter="S"
        className={letterClassName}
        d="M77.8428 48.3066L35.3418 39.7354V66.415L77.8428 57.8438V144.506H0L4 96.4062L42.3486 104.978V78.0908L4 86.6621L0 0H77.8428V48.3066Z"
        fill="currentColor"
      />
      <path
        ref={letterRefs[1]}
        data-logo="skw"
        data-letter="K"
        className={letterClassName}
        d="M123.476 35.8672L133.814 0H171L157.812 72.1494L171 144.506H133.814L123.476 108.432V144.506H86.1338V0H123.476V35.8672Z"
        fill="currentColor"
      />
      <path
        ref={letterRefs[2]}
        data-logo="skw"
        data-letter="W"
        className={letterClassName}
        d="M209.763 96.1992H226.6L221.761 0H257.103L252.264 96.1992H268.948L264.11 0H299.604L295.604 37L299.604 144.506H179.26L183.26 37.5L179.26 0H214.602L209.763 96.1992Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function KHSMark({
  className = "",
  letterClassName = "",
  letterRefs = [],
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 300 145"
      aria-hidden="true"
      className={clsx("block text-current", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={letterRefs[0]}
        data-logo="khs"
        data-letter="K"
        className={letterClassName}
        d="M37.3408 35.8672L47.6807 0H87.7559L71.6768 72.1494L87.7559 144.506H47.6807L37.3408 108.432V144.506H0V0H37.3408V35.8672Z"
        fill="currentColor"
      />
      <path
        ref={letterRefs[1]}
        data-logo="khs"
        data-letter="H"
        className={letterClassName}
        d="M144.955 40.7012H161.64L156.802 0H209.519V144.506H156.802L161.64 104.013H144.955L149.794 144.506H95.7559V0H149.794L144.955 40.7012Z"
        fill="currentColor"
      />
      <path
        ref={letterRefs[2]}
        data-logo="khs"
        data-letter="S"
        className={letterClassName}
        d="M299.756 48.3066L257.255 39.7354V66.415L299.756 57.8438V144.506H217.756L221.913 96.4062L264.262 104.978V78.0908L221.913 86.6621L217.756 0H299.756V48.3066Z"
        fill="currentColor"
      />
    </svg>
  );
}
