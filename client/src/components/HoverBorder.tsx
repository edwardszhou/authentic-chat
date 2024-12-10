import cn from "@/lib/utils";
import { type ReactNode } from "react";

export default function HoverBorder({
  containerClassName,
  borderColorClassName,
  children
}: {
  containerClassName?: string;
  borderColorClassName: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group relative h-fit w-fit overflow-hidden", containerClassName)}>
      <span
        className={cn(
          "ease absolute left-0 top-0 h-0 w-0 border-t-2 transition-all duration-200 group-hover:w-full",
          borderColorClassName
        )}
      />
      <span
        className={cn(
          "ease absolute right-0 top-0 h-0 w-0 border-r-2 transition-all duration-200 group-hover:h-full",
          borderColorClassName
        )}
      />
      <span
        className={cn(
          "ease absolute bottom-0 right-0 h-0 w-0 border-b-2 transition-all duration-200 group-hover:w-full",
          borderColorClassName
        )}
      />
      <span
        className={cn(
          "ease absolute bottom-0 left-0 h-0 w-0 border-l-2 transition-all duration-200 group-hover:h-full",
          borderColorClassName
        )}
      />
      {children}
    </div>
  );
}
