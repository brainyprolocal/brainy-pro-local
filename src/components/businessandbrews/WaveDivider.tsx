interface WaveDividerProps {
  flip?: boolean;
  className?: string;
  color?: string;
}

export default function WaveDivider({
  flip = false,
  className = '',
  color = '#1D4781',
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? '-scale-y-100 transform' : ''
      } ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[80px] block"
      >
        <path
          d="M0,32 C240,75 480,10 720,42 C960,74 1200,15 1440,36 L1440,80 L0,80 Z"
          fill={color}
          fillOpacity="0.4"
        />
        <path
          d="M0,50 C320,15 640,75 960,35 C1160,10 1320,55 1440,48 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
