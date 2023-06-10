import { useState } from "react";
import { Item } from "../types";

export function useErrors() {
  const [errors, setErrors] = useState({ name: "", maxDays: "" });

  const handleErrors = (name: string, maxDays: number, list: Item[]) => {
    if (!name || !maxDays) {
      const updatedErrors = {
        name: !name ? "Name is required" : "",
        maxDays: !maxDays ? "Max Days is required" : "",
      };

      setErrors(updatedErrors);

      return updatedErrors;
    }

    if (list.some((item) => item.name === name)) {
      const updatedErrors = { name: "Name already exists", maxDays: "" };

      setErrors(updatedErrors);

      return updatedErrors;
    }

    const updatedErrors = { name: "", maxDays: "" };

    setErrors(updatedErrors);

    return updatedErrors;
  };

  return {
    handleErrors,
    errors,
  };
}
