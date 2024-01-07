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

test("turn on only first two dots", () => {
  const maxDays = faker.number.int({ min: 10, max: 100 });
  const date = faker.date.anytime();
  const halfMaxDays = Math.ceil(maxDays / (DOTS_SIZE / 2));

  render(
    <DaysIndicator
      currentDate={addDays(date, halfMaxDays)}
      date={date}
      maxDays={maxDays}
    />
  );

  expect(screen.getAllByTestId("dot")[0]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[1]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[2]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[3]).not.toHaveClass("hot");
});

test("turn on only first three dots", () => {
  const maxDays = faker.number.int({ min: 10, max: 100 });
  const date = faker.date.anytime();
  const threeQuarterMaxDays = Math.ceil((maxDays / DOTS_SIZE) * 3);

  render(
    <DaysIndicator
      currentDate={addDays(date, threeQuarterMaxDays)}
      date={date}
      maxDays={maxDays}
    />
  );

  expect(screen.getAllByTestId("dot")[0]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[1]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[2]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[3]).not.toHaveClass("hot");
});

test("turn on only all four dots", () => {
  const maxDays = faker.number.int({ min: 10, max: 100 });
  const date = faker.date.anytime();

  render(
    <DaysIndicator
      currentDate={addDays(date, maxDays)}
      date={date}
      maxDays={maxDays}
    />
  );

  expect(screen.getAllByTestId("dot")[0]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[1]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[2]).toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[3]).toHaveClass("hot");
});

test("turn off all four dots", () => {
  const maxDays = faker.number.int({ min: 10, max: 100 });
  const date = faker.date.anytime();
  const lessThanQuarterMaxDays = Math.ceil(maxDays / DOTS_SIZE) - 1;

  render(
    <DaysIndicator
      currentDate={addDays(date, lessThanQuarterMaxDays)}
      date={date}
      maxDays={maxDays}
    />
  );

  expect(screen.getAllByTestId("dot")[0]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[1]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[2]).not.toHaveClass("hot");
  expect(screen.getAllByTestId("dot")[3]).not.toHaveClass("hot");
});
