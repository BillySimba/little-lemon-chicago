/**
 * Booking API helper wrapping Meta's capstone API (window.fetchAPI / window.submitAPI)
 * with an identical deterministic fallback so local execution and Jest unit tests work
 * seamlessly even without external script network access.
 */

const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => {
    s = (s * a) % m;
    return s / m;
  };
};

const fallbackFetchAPI = (date) => {
  const parsedDate = date instanceof Date ? date : new Date(date);
  const safeDay = Number.isNaN(parsedDate.getTime()) ? 1 : parsedDate.getDate();
  const result = [];
  const random = seededRandom(safeDay);

  for (let hour = 17; hour <= 23; hour += 1) {
    if (random() < 0.5) {
      result.push(`${hour}:00`);
    }
    if (random() < 0.5) {
      result.push(`${hour}:30`);
    }
  }

  return result.length > 0 ? result : ["17:00", "18:00", "19:00", "20:00", "21:00"];
};

const fallbackSubmitAPI = (formData) => {
  return Boolean(formData && formData.date && formData.time && Number(formData.guests) >= 1);
};

/**
 * Returns an array of available reservation time slots for the provided Date.
 * @param {Date|string} date
 * @returns {string[]}
 */
export function fetchAvailableTimes(date) {
  const dateObj = date instanceof Date ? date : new Date(`${date}T12:00:00`);
  if (typeof window !== "undefined" && typeof window.fetchAPI === "function") {
    try {
      const slots = window.fetchAPI(dateObj);
      if (Array.isArray(slots) && slots.length > 0) {
        return slots;
      }
    } catch (_err) {
      // Fallback to deterministic local schedule if external script throws
    }
  }
  return fallbackFetchAPI(dateObj);
}

/**
 * Submits reservation data to the booking API.
 * @param {object} formData
 * @returns {boolean}
 */
export function submitBookingData(formData) {
  if (typeof window !== "undefined" && typeof window.submitAPI === "function") {
    try {
      return Boolean(window.submitAPI(formData));
    } catch (_err) {
      return fallbackSubmitAPI(formData);
    }
  }
  return fallbackSubmitAPI(formData);
}
