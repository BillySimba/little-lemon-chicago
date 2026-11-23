/**
 * Client-side validation utilities for the Little Lemon table booking form.
 * Designed as pure, testable functions covering both standard rules and edge cases.
 */

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

export const VALID_OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Engagement",
  "Business Dinner",
  "Casual Dining",
];

/**
 * Returns today's local calendar date formatted as YYYY-MM-DD.
 * @param {Date} [referenceDate]
 * @returns {string}
 */
export function getTodayISO(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, "0");
  const day = String(referenceDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Validates that a reservation date string is YYYY-MM-DD and not in the past.
 * @param {string} dateStr
 * @param {string} [minDateStr]
 * @returns {boolean}
 */
export function isValidDate(dateStr, minDateStr = getTodayISO()) {
  if (!dateStr || typeof dateStr !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  return dateStr >= minDateStr;
}

/**
 * Validates that a selected reservation time is non-empty and included in availableTimes.
 * @param {string} time
 * @param {string[]} [availableTimes]
 * @returns {boolean}
 */
export function isValidTime(time, availableTimes = []) {
  if (!time || typeof time !== "string") return false;
  if (Array.isArray(availableTimes) && availableTimes.length > 0) {
    return availableTimes.includes(time);
  }
  return /^\d{2}:\d{2}$/.test(time);
}

/**
 * Validates that guest count is a whole integer between MIN_GUESTS (1) and MAX_GUESTS (10).
 * @param {number|string} guests
 * @returns {boolean}
 */
export function isValidGuests(guests) {
  if (guests === "" || guests === null || guests === undefined) return false;
  const num = Number(guests);
  return Number.isInteger(num) && num >= MIN_GUESTS && num <= MAX_GUESTS;
}

/**
 * Validates that the selected occasion is non-empty and one of the supported options.
 * @param {string} occasion
 * @returns {boolean}
 */
export function isValidOccasion(occasion) {
  return typeof occasion === "string" && VALID_OCCASIONS.includes(occasion);
}

/**
 * Validates all booking form fields and returns a field-keyed map of actionable error messages.
 * @param {object} values
 * @param {string[]} [availableTimes]
 * @param {string} [minDateStr]
 * @returns {{ date?: string, time?: string, guests?: string, occasion?: string, name?: string, email?: string }}
 */
export function validateBookingForm(values, availableTimes = [], minDateStr = getTodayISO()) {
  const errors = {};

  if (!values.date) {
    errors.date = "Please choose a reservation date.";
  } else if (!isValidDate(values.date, minDateStr)) {
    errors.date = "Reservation date cannot be in the past. Please choose today or a future date.";
  }

  if (!Array.isArray(availableTimes) || availableTimes.length === 0) {
    errors.time = "No reservation slots remain for this date. Please select another date.";
  } else if (!isValidTime(values.time, availableTimes)) {
    errors.time = "Please choose an available reservation time.";
  }

  if (values.guests === "" || values.guests === null || values.guests === undefined) {
    errors.guests = "Please enter the number of guests.";
  } else if (!isValidGuests(values.guests)) {
    errors.guests = `Please enter a whole number between ${MIN_GUESTS} and ${MAX_GUESTS} guests.`;
  }

  if (!isValidOccasion(values.occasion)) {
    errors.occasion = "Please select a dining occasion.";
  }

  if (values.email && values.email.trim() !== "") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      errors.email = "Please enter a valid email address (for example, name@example.com).";
    }
  }

  return errors;
}
