import { capabilities } from "@/lib/content";

export default function TechMarquee() {
  const items = [...capabilities, ...capabilities];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex w-max gap-8 py-2"
        style={{ animation: "marquee 24s linear infinite" }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="chip whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
