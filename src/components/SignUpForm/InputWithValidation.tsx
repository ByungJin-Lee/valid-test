import { useRef } from "react";
import Input, { InputProps } from "../Input";

interface InputWithValidationProps extends InputProps {
  isInvalid: boolean;
  ComponentOnInvalid: JSX.Element;
  focused: boolean;
}

export const InputWithValidation = ({
  isInvalid,
  ComponentOnInvalid,
  focused,
  ...props
}: InputWithValidationProps) => {
  const ref = useRef<HTMLInputElement>(null);

  if (focused && ref.current) {
    ref.current.focus();
  }

  return (
    <div>
      <Input {...props} ref={ref} />
      {isInvalid && ComponentOnInvalid}
    </div>
  );
};

export default InputWithValidation;
