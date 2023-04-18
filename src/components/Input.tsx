import React, { LegacyRef, forwardRef } from "react";

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > {
  onChange(value: string): void;
}

function Input(
  { onChange, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    target && onChange(target.value);

  return <input ref={ref} {...props} onChange={handleChange} />;
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
