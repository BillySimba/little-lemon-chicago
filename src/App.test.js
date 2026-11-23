import { render, screen } from "@testing-library/react";
import App from "./App";
import { initializeTimes, updateTimes } from "./components/Main";

describe("App & Main reservation state", () => {
  test("renders the Little Lemon homepage hero and Reserve a Table CTA", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1, name: /little lemon/i });
    const ctaLink = screen.getByText(/reserve a table/i, { selector: "a.btn" });
    expect(heading).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute("href", "/booking");
  });

  test("initializeTimes returns a non-empty array of available reservation slots", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
    times.forEach((slot) => {
      expect(slot).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test("updateTimes returns updated available times when given a selected date", () => {
    const initialState = ["17:00", "18:00"];
    const nextState = updateTimes(initialState, {
      type: "UPDATE_TIMES",
      date: "2026-12-20",
    });
    expect(Array.isArray(nextState)).toBe(true);
    expect(nextState.length).toBeGreaterThan(0);
  });

  test("updateTimes removes a booked slot when BOOK_SLOT is dispatched", () => {
    const state = ["17:00", "18:00", "19:00"];
    const updated = updateTimes(state, { type: "BOOK_SLOT", time: "18:00" });
    expect(updated).toEqual(["17:00", "19:00"]);
  });

  test("updateTimes returns current state unchanged for unknown actions", () => {
    const state = ["17:00", "19:00"];
    expect(updateTimes(state, { type: "UNKNOWN" })).toBe(state);
  });
});
