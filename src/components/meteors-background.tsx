import type { CSSProperties } from "react";

// Seeded values keep the scattered pattern stable across server and client renders.
const leaves = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 61 + 7) % 100,
  size: 22 + ((index * 13) % 29),
  duration: 22 + ((index * 7) % 19),
  delay: -((index * 11 + 5) % 40),
  drift: ((index * 47) % 180) - 90,
  rotation: (index * 53) % 360,
  opacity: 0.12 + ((index * 3) % 7) / 100,
}));

export function MeteorsBackground() {
  return (
    <div aria-hidden="true" className="maple-background fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="maple-fall absolute -top-20"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            "--leaf-drift": `${leaf.drift}px`,
            "--leaf-rotation": `${leaf.rotation}deg`,
          } as CSSProperties}
        >
          <svg className="maple-sway h-full w-full" style={{ animationDuration: `${5 + index % 5}s`, animationDelay: `${-index}s` }} viewBox="0 0 100 110" fill="currentColor" focusable="false">
            <path d="M48 91 48 73 27 78 30 66 8 49 19 45 14 27 31 33 34 23 43 38 41 17 48 21 53 2 60 23 67 18 63 41 76 27 77 38 94 33 87 51 97 56 72 69 74 80 55 74 53 92 53 105 48 105Z" />
            <path d="M51 88 54 29M52 65 28 44M53 64 77 47M51 73 33 71M53 72 71 74" fill="none" stroke="var(--leaf-vein)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}
