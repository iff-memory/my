import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let raf: number;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12;
      trail.current.y += (pos.current.y - trail.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trail.current.x}px`;
        trailRef.current.style.top = `${trail.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(196,160,255,0.9)",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Trail glow */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
