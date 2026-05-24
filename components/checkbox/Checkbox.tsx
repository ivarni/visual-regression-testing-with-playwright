import clsx from "clsx";
import React from "react";
import { ComponentPropsWithRef, forwardRef } from "react";

import styles from "./checkbox.module.css";

type Props = ComponentPropsWithRef<"input"> & { label: string };

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, label, ...rest },
  ref
) {
  return (
    <label className={clsx(styles.label, className)}>
      <input type="checkbox" className={styles.checkbox} ref={ref} {...rest} />
      {label}
    </label>
  );
});
