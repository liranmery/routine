import { differenceInCalendarDays } from "date-fns";
import styles from "./App.module.css";
import { DaysIndicator } from "./DaysIndicator";
import { Item } from "./types";
import { useCurrentDate } from "./hooks/useCurrentDate";

interface AgendasListProps {
  list: Item[];
  onListItemClick: (name: string) => void;
}

export function AgendasList({ list, onListItemClick }: AgendasListProps) {
  const { currentDate } = useCurrentDate();

  const compareDaysRatio = (itemA: Item, itemB: Item) => {
    const { date: dateA, maxDays: maxDaysA } = itemA;
    const { date: dateB, maxDays: maxDaysB } = itemB;

    const daysRatioA =
      differenceInCalendarDays(currentDate, new Date(dateA)) / maxDaysA;
    const daysRatioB =
      differenceInCalendarDays(currentDate, new Date(dateB)) / maxDaysB;

    if (daysRatioA < daysRatioB) {
      return 1;
    } else if (daysRatioA > daysRatioB) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <ul className={styles.list}>
      {[...list].sort(compareDaysRatio).map((item) => (
        <li
          key={item.name}
          onDoubleClick={() => onListItemClick(item.name)}
          className={styles.item}
        >
          <div>
            <h1 className={styles.header}>{item.name}</h1>
            <h2 className={styles.lightColor}>{item.date}</h2>
          </div>
          <DaysIndicator
            date={item.date}
            maxDays={item.maxDays}
            currentDate={currentDate}
          />
        </li>
      ))}
    </ul>
  );
}
