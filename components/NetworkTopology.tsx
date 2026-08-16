const spokes = [
  { x: 60, y: 60 },
  { x: 340, y: 50 },
  { x: 380, y: 220 },
  { x: 220, y: 280 },
  { x: 40, y: 210 },
];

export default function NetworkTopology() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="w-full h-auto max-w-md mx-auto"
      role="img"
      aria-label="Hub-and-spoke network topology diagram"
    >
      {spokes.map((spoke, i) => (
        <line
          key={i}
          x1={210}
          y1={160}
          x2={spoke.x}
          y2={spoke.y}
          stroke="rgba(34, 211, 238, 0.25)"
          strokeWidth={1.5}
        />
      ))}

      {spokes.map((spoke, i) => (
        <circle
          key={i}
          cx={spoke.x}
          cy={spoke.y}
          r={6}
          fill="rgba(34, 211, 238, 0.5)"
          stroke="#22D3EE"
          strokeWidth={1.5}
        >
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="3s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <circle cx={210} cy={160} r={14} fill="#0891B2" stroke="#22D3EE" strokeWidth={2} />
      <circle cx={210} cy={160} r={22} fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth={1}>
        <animate attributeName="r" values="18;30;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
