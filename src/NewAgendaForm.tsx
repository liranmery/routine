import { FormEvent } from "react";
import styles from "./App.module.css";

interface NewAgendaFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: {
    name: string;
    maxDays: string;
  };
}

export function NewAgendaForm({ onSubmit, errors }: NewAgendaFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
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
