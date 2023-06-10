import { FormEvent } from "react";
import styles from "./App.module.css";
import { Item } from "./types";
import { useErrors } from "./hooks/useErrors";

interface NewAgendaFormProps {
  list: Item[];
  addListItem: (item: Pick<Item, "name" | "maxDays">) => void;
}

export function NewAgendaForm({ list, addListItem }: NewAgendaFormProps) {
  const { errors, handleErrors } = useErrors();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      maxDays: { value: string };
    };

    const name = target.name.value;
    const maxDays = +target.maxDays.value;

    const updatedErrors = handleErrors(name, maxDays, list);

    if (updatedErrors.name || updatedErrors.maxDays) return;

    addListItem({ name, maxDays });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend>New agenda</legend>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input type="text" name="name" id="name" />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        <label className={styles.label} htmlFor="maxDays">
          Max Days
        </label>
        <input type="number" name="maxDays" id="maxDays" />
        {errors.maxDays && <p className={styles.error}>{errors.maxDays}</p>}
      </fieldset>
      <button className={styles.button}>Add</button>
    </form>
  );
}
