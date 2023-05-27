import { differenceInDays } from "date-fns";
import styles from "./DaysIndicator.module.css";
import { DOTS_SIZE } from "./consts";

interface DaysIndicatorProps {
  date: string;
  max: number;
}

export function DaysIndicator({ date, max }: DaysIndicatorProps) {
  const daysDiff = differenceInDays(new Date(), new Date(date));

  return (
    <div className={styles.root}>
      {[...Array(DOTS_SIZE)].map((_, index) => {
        return (
          <span
            key={index}
            className={`${styles.dot} ${
              (index + 1) * (1 / DOTS_SIZE) <= daysDiff / max ? styles.hot : ""
            }`}
          />
        );
      })}
    </div>
  );
}
