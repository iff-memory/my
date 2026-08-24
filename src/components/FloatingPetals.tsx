import { useEffect, useState } from "react";

const PETALS = ["🌸", "✿", "🌷", "✦", "⁕", "❀"];

interface Petal {
  id: number;
  emoji: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
  drift: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: PETALS[i % PETALS.length],
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 12}s`,
      size: `${12 + Math.random() * 10}px`,
      drift: `${(Math.random() - 0.5) * 80}px`,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            "--dur": p.duration,
            "--delay": p.delay,
            "--size": p.size,
            "--drift": p.drift,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
