import { Item } from "../../types/Item.ts";

export interface AgendasListProps {
  list: Item[];
  onListItemClick: (name: string) => void;
}
