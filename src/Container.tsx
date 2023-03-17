import React from "react";
import styles from "./stuff/styles.module.css";

interface ILayoutProps {
  children?: React.ReactNode;
}

export function Container({ children }: ILayoutProps) {
  return <div className={styles.container}>{children}</div>;
}
