import styles from "./AgendasList.module.css";
import { DaysIndicator } from "../DaysIndicator/DaysIndicator.tsx";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { format } from "date-fns";
import { getDaysRatioComparator } from "./getDaysRatioComparator.ts";
import { AgendasListProps } from "./AgendasListProps.ts";

export function AgendasList({ list, onListItemClick }: AgendasListProps) {
  const { currentDate } = useCurrentDate();

  return (
    <ul className={styles.list}>
      {[...list].sort(getDaysRatioComparator(currentDate)).map((item) => (
        <li
          key={item.name}
          onDoubleClick={() => onListItemClick(item.name)}
          className={styles.item}
        >
          <div>
            <h1 className={styles.header}>{item.name}</h1>
            <h2 className={styles.lightColor}>
              {format(new Date(item.date), "d/L/yy HH:mm")}
            </h2>
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
