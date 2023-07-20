import { useEffect, useState } from "react";
import { Item } from "../types/Item.ts";

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
        date: new Date(),
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
        date: new Date(),
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
