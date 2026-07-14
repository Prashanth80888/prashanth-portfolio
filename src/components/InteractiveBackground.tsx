import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 120,
    };

    // Particles array
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(75, Math.floor((width * height) / 22000));

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1;
      // Soft gold or classic steel blue colors
      const isGold = Math.random() > 0.7;
      const color = isGold ? "201, 162, 39" : "182, 194, 210";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: size,
        baseSize: size,
        color: color,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Handles resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Tracks mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      // Clear with very slight transparency to leave beautiful trails
      ctx.fillStyle = "rgba(6, 7, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate actual mouse coordinates to targets
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw active mouse spotlight
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      gradient.addColorStop(0, "rgba(201, 162, 39, 0.035)");
      gradient.addColorStop(0.5, "rgba(76, 111, 255, 0.01)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render grid/constellations and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse: pull closer, grow size if near
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
          p.size = p.baseSize + force * 2.5;
        } else {
          p.size = p.size + (p.baseSize - p.size) * 0.1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.size > 2.5 ? 8 : 0;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Interconnect near particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          // Standard tech constellation threshold
          if (dist2 < 110) {
            const alpha = (110 - dist2) / 110 * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Blend line colors beautifully
            ctx.strokeStyle = `rgba(182, 194, 210, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
