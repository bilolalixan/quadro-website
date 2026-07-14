export function NavArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      className={direction === "next" ? "rotate-180" : ""}
      aria-hidden
    >
      <path
        d="M19 7H1M1 7L7 1M1 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
