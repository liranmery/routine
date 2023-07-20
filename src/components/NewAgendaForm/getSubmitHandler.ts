import { FormEvent } from "react";
import { useErrors } from "../../hooks/useErrors.ts";
import { NewAgendaFormProps } from "./NewAgendaFormProps.ts";

export function getSubmitHandler(
  addListItem: NewAgendaFormProps["addListItem"],
  handleErrors: ReturnType<typeof useErrors>["handleErrors"],
  list: NewAgendaFormProps["list"]
) {
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

  return handleSubmit;
}
