import React, { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

import styles from "./button.module.css";

type Props = ComponentPropsWithRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, ...rest }: Props,
  ref
) {
  return (
    <button className={clsx(styles.button, className)} ref={ref} {...rest} />
  );
});
