import clsx from "clsx";
import React from "react";
import { ComponentPropsWithRef, forwardRef } from "react";

import styles from "./input.module.css";

type Props = ComponentPropsWithRef<"input"> & {};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...rest },
  ref
) {
  return (
    <input className={clsx(styles.input, className)} ref={ref} {...rest} />
  );
});
