interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  return (
    <span className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
