type ServiceWaveProps = {
  className?: string;
};

export default function ServiceWave({ className }: ServiceWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1341 1794"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="service-wave__path"
        d="M1474.95 21.8658C1474.95 40.8658 1526.66 3.51036 1233.16 277.51C939.655 551.51 391.861 658.155 661.656 440.011C931.45 221.866 1449.45 378.866 953.45 703.866C457.45 1028.87 -105.072 974.615 89.45 1234.37C256.45 1457.37 973.45 1260.37 1019.45 1463.37C1065.45 1666.37 197.95 1722.37 177.95 1750.37"
        stroke="url(#service-wave-gradient)"
        strokeOpacity="0.4"
        strokeWidth="177"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="service-wave-gradient"
          x1="1145.15"
          y1="-166.952"
          x2="1145.15"
          y2="1582.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4008C3" />
          <stop offset="0.355769" stopColor="#7B63FA" />
          <stop offset="0.764423" stopColor="#AC6CFF" />
          <stop offset="1" stopColor="#c1b6da" />
        </linearGradient>
      </defs>
    </svg>
  );
}
