import React from 'react';
import { NOOP } from '../../utils/noop';

interface IButtonProps {
  className: string;
  callback?: () => void;
  children?: React.ReactNode;
  text?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ className, callback = NOOP, children, text, type }: IButtonProps) {
  return (
    <button type={type} className={className} onClick={callback}>
      {children}
      {text}
    </button>
  );
}
