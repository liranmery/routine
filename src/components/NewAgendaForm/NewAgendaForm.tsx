import styles from "./NewAgendaForm.module.css";
import { useErrors } from "../../hooks/useErrors.ts";
import { getSubmitHandler } from "./getSubmitHandler.ts";
import { NewAgendaFormProps } from "./NewAgendaFormProps.ts";

export function NewAgendaForm({ list, addListItem }: NewAgendaFormProps) {
  const { errors, handleErrors } = useErrors();

  return (
    <form
      onSubmit={getSubmitHandler(addListItem, handleErrors, list)}
      className={styles.form}
    >
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
