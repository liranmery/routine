import { differenceInCalendarDays } from "date-fns";
import { DOTS_SIZE } from "../../consts";
import { DaysIndicatorProps } from "./DaysIndicatorProps";

export function isDotActive(
  maxDays: DaysIndicatorProps["maxDays"],
  dotNumber: number,
  date: DaysIndicatorProps["date"],
  currentDate: DaysIndicatorProps["currentDate"]
) {
  const daysDiff = differenceInCalendarDays(currentDate, new Date(date));

  const dotRatio = dotNumber * (1 / DOTS_SIZE);
  const daysRatio = daysDiff / maxDays;

  return dotRatio <= daysRatio;
}
