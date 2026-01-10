"use client";

export default function DNAHelix({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full opacity-20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        {/* DNA Double Helix Strands */}
        <g className="animate-pulse-glow">
          {/* Left strand */}
          <path
            d="M50 0 Q100 50 50 100 Q0 150 50 200 Q100 250 50 300 Q0 350 50 400"
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
          />
          {/* Right strand */}
          <path
            d="M150 0 Q100 50 150 100 Q200 150 150 200 Q100 250 150 300 Q200 350 150 400"
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
          />

          {/* Cross bars (base pairs) */}
          {[25, 75, 125, 175, 225, 275, 325, 375].map((y, i) => (
            <line
              key={i}
              x1={50 + Math.sin((y / 50) * Math.PI) * 50}
              y1={y}
              x2={150 - Math.sin((y / 50) * Math.PI) * 50}
              y2={y}
              stroke="url(#dnaGradient)"
              strokeWidth="2"
              opacity={0.6}
            />
          ))}

          {/* Nucleotide dots */}
          {[25, 75, 125, 175, 225, 275, 325, 375].map((y, i) => (
            <g key={`dots-${i}`}>
              <circle
                cx={50 + Math.sin((y / 50) * Math.PI) * 50}
                cy={y}
                r="4"
                fill={i % 2 === 0 ? "#1e3a5f" : "#14b8a6"}
              />
              <circle
                cx={150 - Math.sin((y / 50) * Math.PI) * 50}
                cy={y}
                r="4"
                fill={i % 2 === 0 ? "#14b8a6" : "#1e3a5f"}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
