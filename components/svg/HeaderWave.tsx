type HeaderWaveProps = {
  className?: string;
};

export default function HeaderWave({ className }: HeaderWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 737 659"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M224.533 -75C553.034 -131.5 -141.467 323 103.534 248C348.534 173 744.034 129.5 672.034 242C600.034 354.5 122.534 770.5 783.534 540"
        stroke="#733BF7"
        strokeOpacity="0.4"
        strokeWidth="100"
        strokeLinecap="round"
      />
    </svg>
  );
}
