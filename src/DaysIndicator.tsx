import { differenceInCalendarDays } from "date-fns";
import styles from "./DaysIndicator.module.css";
import { DOTS_SIZE } from "./consts";

interface DaysIndicatorProps {
  date: Date;
  maxDays: number;
  currentDate: Date;
}

export function DaysIndicator({
  date,
  maxDays,
  currentDate,
}: DaysIndicatorProps) {
  const daysDiff = differenceInCalendarDays(currentDate, new Date(date));

  return (
    <div className={styles.root}>
      {[...Array(DOTS_SIZE)].map((_, index) => {
        const dotRatio = (index + 1) * (1 / DOTS_SIZE);
        const daysRatio = daysDiff / maxDays;
        const isDotActive = dotRatio <= daysRatio;

        return (
          <span
            key={index}
            className={`${styles.dot} ${isDotActive ? styles.hot : ""}`}
          />
        );
      })}
    </div>
  );
}
