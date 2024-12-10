import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, label, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex w-56 flex-col-reverse rounded-xl border-2 border-grayscale-20 p-3',
          className
        )}
      >
        <input
          id={id}
          className={cn(
            'peer text-xl text-black transition-colors',
            'rounded-r-4xl -mt-1 h-fit w-full rounded-bl-3xl border-[3px] border-white p-2',
            'focus:border-pink-medium focus:outline-none'
          )}
          {...props}
          ref={ref}
        />
        <label
          htmlFor={id}
          className="w-fit text-ellipsis text-nowrap p-2 pt-1 text-lg text-grayscale-60 transition-colors"
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
