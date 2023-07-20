import { differenceInCalendarDays } from "date-fns";
import { Item } from "../../types/Item.ts";

export function getDaysRatioComparator(currentDate: Date) {
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

  return compareDaysRatio;
}
