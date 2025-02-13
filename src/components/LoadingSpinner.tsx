import type React from "react";

export default function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="absolute inset-0 bg-background/50 flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary w-8 h-8`}
      ></div>
    </div>
  );
}
