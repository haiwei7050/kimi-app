export function LoadingScreen() {
  const bars = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    opacity: 0.1 + (i / 12) * 0.9,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(121, 125, 133, 0.4)',
      }}
    >
      <div
        style={{
          width: '130px',
          height: '118px',
          backgroundColor: 'rgba(140, 143, 150, 0.55)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <g>
            {bars.map(({ angle, opacity }) => (
              <rect
                key={angle}
                x="17"
                y="4"
                width="2"
                height="8"
                rx="1"
                fill="white"
                opacity={opacity}
                transform={`rotate(${angle} 18 18)`}
              />
            ))}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
