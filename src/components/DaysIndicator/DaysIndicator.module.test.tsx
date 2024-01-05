import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DaysIndicator } from "./DaysIndicator";
import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";
import { DOTS_SIZE } from "../../consts";

test("display four dots", () => {
  render(
    <DaysIndicator
      currentDate={faker.date.anytime()}
      date={faker.date.anytime()}
      maxDays={faker.number.int()}
    />
  );

  expect(screen.getAllByTestId("dot")).toHaveLength(DOTS_SIZE);
});

test("turn on only first dot", () => {
  const maxDays = faker.number.int({ min: 10, max: 100 });
  const date = faker.date.anytime();
  const quarterMaxDays = Math.ceil(maxDays / DOTS_SIZE);

  render(
    <DaysIndicator
      currentDate={addDays(date, quarterMaxDays)}
      date={date}
      maxDays={maxDays}
    />
  );

  expect(screen.getAllByTestId("dot")[0]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[1]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[2]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[3]).not.toHaveClass("hot");
});
