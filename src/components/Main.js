import React, { useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import AboutPage from "../pages/AboutPage";
import MenuPage from "../pages/MenuPage";
import ConfirmedBooking from "./ConfirmedBooking";
import { fetchAvailableTimes, submitBookingData } from "../utils/bookingAPI";

/**
 * Initializes available reservation times for today's date via the booking API.
 * Exported for unit testing.
 * @returns {string[]}
 */
export function initializeTimes() {
  return fetchAvailableTimes(new Date());
}

/**
 * Reducer handling reservation time-slot updates when the user selects a date
 * or completes a booking (preventing double booking within the session).
 * Exported for unit testing.
 * @param {string[]} state
 * @param {{ type?: string, date?: string|Date, time?: string }} action
 * @returns {string[]}
 */
export function updateTimes(state, action) {
  if (!action) {
    return state;
  }

  if (action.type === "BOOK_SLOT" && action.time) {
    return state.filter((slot) => slot !== action.time);
  }

  if (action.date) {
    return fetchAvailableTimes(action.date);
  }

  return state;
}

/**
 * Main semantic landmark managing client-side routes and lifted booking state.
 */
function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [lastBooking, setLastBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const succeeded = submitBookingData(formData);
    if (succeeded) {
      setLastBooking(formData);
      setBookingHistory((prev) => [formData, ...prev]);
      dispatch({ type: "BOOK_SLOT", time: formData.time });
      if (typeof window !== "undefined" && !/jsdom/i.test(window.navigator?.userAgent || "")) {
        window.scrollTo(0, 0);
      }
      navigate("/confirmed");
    }
    return succeeded;
  };

  return (
    <main id="main-content" className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
              bookingHistory={bookingHistory}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking booking={lastBooking} />} />
      </Routes>
    </main>
  );
}

export default Main;
