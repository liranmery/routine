import { Item } from "../../types/Item.ts";

export interface NewAgendaFormProps {
  list: Item[];
  addListItem: (item: Pick<Item, "name" | "maxDays">) => void;
}
