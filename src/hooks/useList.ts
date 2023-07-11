import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Item } from "../types";

export function useList() {
  const [list, setList] = useState<Item[]>(() =>
    JSON.parse(localStorage.getItem("list") ?? "[]")
  );

  const addListItem = (item: Pick<Item, "name" | "maxDays">) => {
    setList([
      ...list,
      {
        name: item.name,
        maxDays: item.maxDays,
        date: format(new Date(), "d/L/yy HH:mm"),
      },
    ]);
  };

  const updateListItem = (name: string) => {
    const index = list.findIndex((item) => item.name === name);

    setList([
      ...list.slice(0, index),
      ...list.slice(index + 1),
      {
        ...list[index],
        date: format(new Date(), "d/L/yy HH:mm"),
      },
    ]);
  };

  const setLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  useEffect(setLocalStorage, [list]);

  return {
    list,
    updateListItem,
    addListItem,
  };
}
