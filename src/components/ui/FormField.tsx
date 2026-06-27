import * as React from "react";
import { cn } from "./Button";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className={cn("relative group w-full", className)}>
        <input
          suppressHydrationWarning
          id={inputId}
          ref={ref}
          placeholder=" "
          className="peer w-full bg-transparent border-b border-muted/50 px-0 py-3 text-dark focus:outline-none focus:border-transparent transition-colors"
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-0 -top-4 text-xs text-muted transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold"
        >
          {label}
        </label>
        {/* Animated Gold Underline */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-gold group-focus-within:w-full" />
      </div>
    );
  }
);
FormField.displayName = "FormField";
