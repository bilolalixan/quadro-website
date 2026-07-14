export function ArrowCircle({
  variant = "on-light",
  className = "",
}: {
  variant?: "on-light" | "on-dark";
  className?: string;
}) {
  const circleClass = variant === "on-light" ? "fill-maroon" : "fill-cream";
  const arrowClass = variant === "on-light" ? "fill-cream" : "fill-maroon";

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <circle cx="10" cy="10" r="10" className={circleClass} />
      <path
        d="M5.96 9.13L7.52 9.16L12.39 9.17L12.86 9.2L12.86 9.16L12.24 8.68L9.87 6.32L10.43 5.76L14.1 9.43L14.1 9.67L10.43 13.35L9.87 12.8L12.25 10.42L12.86 9.96L12.86 9.91L12.38 9.93L7.7 9.95L5.97 9.97L5.96 9.13Z"
        className={arrowClass}
      />
    </svg>
  );
}
