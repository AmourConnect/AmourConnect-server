import { cn } from "@/lib/utils";

const TextShine = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className: string;
}) => {
  return (
    <h2
      className={cn(
        className,
        "animate-background-shine inline-flex bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text  text-transparent",
      )}
    >
      {children}
    </h2>
  );
};

export default TextShine;
