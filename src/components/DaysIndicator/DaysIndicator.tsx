import styles from "./DaysIndicator.module.css";
import { DOTS_SIZE } from "../../consts";
import { isDotActive } from "./isDotActive.ts";
import { DaysIndicatorProps } from "./DaysIndicatorProps.ts";

export function DaysIndicator({
  date,
  maxDays,
  currentDate,
}: DaysIndicatorProps) {
  return (
    <div className={styles.root}>
      {[...Array(DOTS_SIZE)].map((_, index) => (
        <span
          key={index}
          className={`${styles.dot} ${
            isDotActive(maxDays, index + 1, date, currentDate) ? styles.hot : ""
          }`}
        />
      ))}
    </div>
  );
}
