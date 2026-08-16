"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1000;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <div className="border border-navy-700/70 bg-navy-950/80">
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-navy-700/70">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1.5 px-6 py-6 sm:py-7"
          >
            <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-cyan-300">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
