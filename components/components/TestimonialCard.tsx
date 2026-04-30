import Image from "next/image";
import { forwardRef } from "react";

type TestimonialCardProps = {
  name: string;
  title: string;
  score: number;
  image: string;
  feedback: string;
};

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ name, title, score, image, feedback }, ref) => {
    return (
      <div
        ref={ref}
        className="p-space-base pt-space-2x gap-space-base z-1 flex max-w-2xl flex-col items-end rounded-3xl bg-white/75 shadow-2xl/5 backdrop-blur-md"
      >
        <div className="flex w-full items-center gap-0.5">
          {Array.from({ length: score }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-amber-400"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-secondary text-base indent-12">{feedback}</p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-md font-head text-primary">{name}</p>
            <p className="text-tertiary text-xs">{title}</p>
          </div>
          <div className="aspect-square w-16 rounded-md overflow-hidden">
            <Image
              src={image}
              width={100}
              height={100}
              alt={`Photo de ${name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
