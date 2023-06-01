import { differenceInCalendarDays } from "date-fns";
import styles from "./DaysIndicator.module.css";
import { DOTS_SIZE } from "./consts";
import { useEffect, useState } from "react";

interface DaysIndicatorProps {
  date: string;
  max: number;
}

export function DaysIndicator({ date, max }: DaysIndicatorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const syncDate = () => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(syncDate, []);

  const daysDiff = differenceInCalendarDays(currentDate, new Date(date));

  return (
    <div className={styles.root}>
      {[...Array(DOTS_SIZE)].map((_, index) => {
        const dotRatio = (index + 1) * (1 / DOTS_SIZE);
        const daysRatio = daysDiff / max;
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
