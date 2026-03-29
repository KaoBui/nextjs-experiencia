type ServiceWaveProps = {
  className?: string;
};

export default function ServiceWave({ className }: ServiceWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1327 1563"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="service-wave__path"
        d="M1460.03 32.8489C1460.03 51.8489 1511.74 14.4935 1218.24 288.494C924.739 562.494 376.946 669.138 646.74 450.994C916.535 232.849 1418.54 354.849 938.534 714.849C458.533 1074.85 -152.84 1489.39 151.533 1376.85C449.033 1266.85 1521.03 1115.85 1104.53 1376.85C688.033 1637.85 1438.03 1376.85 1438.03 1376.85"
        stroke="url(#service-wave-gradient)"
        strokeOpacity="0.4"
        strokeWidth="140"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="service-wave-gradient"
          x1="1130.24"
          y1="-155.969"
          x2="1130.24"
          y2="1593.33"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4008C3" />
          <stop offset="0.355769" stopColor="#7B63FA" />
          <stop offset="0.764423" stopColor="#AC6CFF" />
          <stop offset="1" stopColor="#E9E0FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
