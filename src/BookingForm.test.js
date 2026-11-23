import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import {
  getTodayISO,
  isValidDate,
  isValidGuests,
  isValidOccasion,
  isValidTime,
  validateBookingForm,
} from "./utils/validation";

const SAMPLE_TIMES = ["17:00", "18:00", "19:00", "20:00", "21:00"];

describe("BookingForm component", () => {
  test("renders the static Book Now heading and all form labels", () => {
    render(<BookingForm availableTimes={SAMPLE_TIMES} dispatch={jest.fn()} submitForm={jest.fn()} />);
    expect(screen.getByText("Book Now")).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test("applies expected HTML5 validation attributes to all required inputs", () => {
    render(<BookingForm availableTimes={SAMPLE_TIMES} dispatch={jest.fn()} submitForm={jest.fn()} />);

    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toBeRequired();
    expect(dateInput).toHaveAttribute("min", getTodayISO());

    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toBeRequired();

    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toBeRequired();
  });

  test("dispatches UPDATE_TIMES when the reservation date changes", () => {
    const mockDispatch = jest.fn();
    render(<BookingForm availableTimes={SAMPLE_TIMES} dispatch={mockDispatch} submitForm={jest.fn()} />);

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2027-01-15" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      date: "2027-01-15",
    });
  });

  test("disables submit button and shows error message when guest count is invalid", () => {
    const mockSubmit = jest.fn();
    render(<BookingForm availableTimes={SAMPLE_TIMES} dispatch={jest.fn()} submitForm={mockSubmit} />);

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "12" } });
    fireEvent.blur(guestsInput);

    expect(screen.getByRole("alert")).toHaveTextContent(/between 1 and 10 guests/i);
    const submitBtn = screen.getByRole("button", { name: /on click/i });
    expect(submitBtn).toBeDisabled();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("submits valid reservation payload via submitForm", () => {
    const mockSubmit = jest.fn(() => true);
    render(<BookingForm availableTimes={SAMPLE_TIMES} dispatch={jest.fn()} submitForm={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "19:00" } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: "Anniversary" } });
    fireEvent.change(screen.getByLabelText(/confirmation email/i), {
      target: { value: "guest@example.com" },
    });

    const submitBtn = screen.getByRole("button", { name: /on click/i });
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      date: getTodayISO(),
      time: "19:00",
      guests: 4,
      occasion: "Anniversary",
      seating: "Indoor",
      email: "guest@example.com",
    });
  });

  test("handles empty availableTimes edge case gracefully with helpful message", () => {
    render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);
    expect(screen.getByRole("alert")).toHaveTextContent(/no reservation slots remain/i);
    expect(screen.getByRole("button", { name: /on click/i })).toBeDisabled();
  });
});

describe("Booking validation utilities (valid & invalid states)", () => {
  test("isValidDate accepts today and future dates and rejects past or malformed dates", () => {
    expect(isValidDate("2026-12-01", "2026-11-22")).toBe(true);
    expect(isValidDate("2026-11-22", "2026-11-22")).toBe(true);
    expect(isValidDate("2026-11-21", "2026-11-22")).toBe(false);
    expect(isValidDate("", "2026-11-22")).toBe(false);
    expect(isValidDate("not-a-date", "2026-11-22")).toBe(false);
  });

  test("isValidGuests accepts integers 1..10 and rejects 0, negatives, >10, decimals, and empty", () => {
    expect(isValidGuests(1)).toBe(true);
    expect(isValidGuests(10)).toBe(true);
    expect(isValidGuests("4")).toBe(true);
    expect(isValidGuests(0)).toBe(false);
    expect(isValidGuests(-2)).toBe(false);
    expect(isValidGuests(11)).toBe(false);
    expect(isValidGuests(2.5)).toBe(false);
    expect(isValidGuests("")).toBe(false);
  });

  test("isValidTime and isValidOccasion validate against allowed lists", () => {
    expect(isValidTime("18:00", SAMPLE_TIMES)).toBe(true);
    expect(isValidTime("23:30", SAMPLE_TIMES)).toBe(false);
    expect(isValidTime("", SAMPLE_TIMES)).toBe(false);
    expect(isValidOccasion("Birthday")).toBe(true);
    expect(isValidOccasion("Anniversary")).toBe(true);
    expect(isValidOccasion("Unknown")).toBe(false);
  });

  test("validateBookingForm returns empty object for valid form and field errors for invalid fields", () => {
    const valid = validateBookingForm(
      { date: "2026-12-10", time: "18:00", guests: 4, occasion: "Birthday", email: "ok@test.com" },
      SAMPLE_TIMES,
      "2026-11-22"
    );
    expect(valid).toEqual({});

    const invalid = validateBookingForm(
      { date: "2026-01-01", time: "", guests: 0, occasion: "", email: "bad-email" },
      SAMPLE_TIMES,
      "2026-11-22"
    );
    expect(invalid.date).toBeDefined();
    expect(invalid.time).toBeDefined();
    expect(invalid.guests).toBeDefined();
    expect(invalid.occasion).toBeDefined();
    expect(invalid.email).toBeDefined();
  });
});
