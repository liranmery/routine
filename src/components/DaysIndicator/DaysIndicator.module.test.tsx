import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DaysIndicator } from "./DaysIndicator";
import { DOTS_SIZE } from "../../consts";

test("loads and displays days indicator", async () => {
  render(
    <DaysIndicator currentDate={new Date()} date={new Date()} maxDays={1} />
  );

  await screen.findAllByTestId("dot");

  expect(screen.getAllByTestId("dot")).toHaveLength(DOTS_SIZE);
});
