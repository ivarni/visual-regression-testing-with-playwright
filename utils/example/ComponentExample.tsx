import clsx from "clsx";
import React, { ComponentProps, FC } from "react";

import styles from "./component-example.module.css";
import commonStyles from "../../components/common/common.module.css";

type Props = ComponentProps<"div"> & { title: string; component: FC };

export const ComponentExample = ({
  title,
  component: Component,
  className,
  ...rest
}: Props) => {
  return (
    <div
      className={clsx(commonStyles.app, styles.example, className)}
      {...rest}
    >
      <div data-testid="example">
        <h1 className={styles.header}>{title}</h1>
        <div className={styles.container}>
          <Component />
        </div>
      </div>
    </div>
  );
};
