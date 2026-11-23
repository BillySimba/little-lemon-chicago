import React, { useEffect, useState } from "react";
import BookingSlot from "./BookingSlot";
import {
  getTodayISO,
  MAX_GUESTS,
  MIN_GUESTS,
  VALID_OCCASIONS,
  validateBookingForm,
} from "../utils/validation";

/**
 * Controlled table reservation form for Little Lemon Chicago.
 * Applies HTML5 validation attributes, React client-side validation with actionable
 * error feedback, ARIA semantics, and lifted time-slot state via useReducer dispatch.
 */
function BookingForm({ availableTimes = [], dispatch, submitForm }) {
  const todayISO = getTodayISO();

  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState(availableTimes[0] || "");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("Birthday");
  const [seating, setSeating] = useState("Indoor");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Synchronize selected time when availableTimes updates for a newly chosen date
  useEffect(() => {
    if (availableTimes.length === 0) {
      setTime("");
    } else if (!availableTimes.includes(time)) {
      setTime(availableTimes[0]);
    }
  }, [availableTimes, time]);

  const formValues = { date, time, guests, occasion, seating, email };
  const errors = validateBookingForm(formValues, availableTimes, todayISO);
  const isFormValid = Object.keys(errors).length === 0;

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    markTouched("date");
    setSubmitError("");
    if (typeof dispatch === "function" && newDate) {
      dispatch({ type: "UPDATE_TIMES", date: newDate });
    }
  };

  const handleGuestsChange = (event) => {
    const raw = event.target.value;
    setGuests(raw === "" ? "" : Number(raw));
    markTouched("guests");
    setSubmitError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ date: true, time: true, guests: true, occasion: true, email: true });

    if (!isFormValid) {
      setSubmitError("Please resolve the highlighted fields before submitting your reservation.");
      return;
    }

    setSubmitError("");
    if (typeof submitForm === "function") {
      const ok = submitForm({
        date,
        time,
        guests: Number(guests),
        occasion,
        seating,
        email: email.trim(),
      });
      if (ok === false) {
        setSubmitError("We could not complete your reservation right now. Please try again.");
      }
    }
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-labelledby="booking-form-heading"
      noValidate
    >
      <h2 id="booking-form-heading">Book Now</h2>
      <p className="form-intro">
        Select your date, party size, and dining occasion to see live available times.
      </p>

      {submitError && (
        <div className="form-alert" role="alert" aria-live="assertive">
          {submitError}
        </div>
      )}

      {/* Date */}
      <div className="form-field">
        <label htmlFor="res-date">Choose date *</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={date}
          min={todayISO}
          required
          aria-required="true"
          aria-invalid={Boolean(touched.date && errors.date)}
          aria-describedby={touched.date && errors.date ? "res-date-error" : undefined}
          onChange={handleDateChange}
          onBlur={() => markTouched("date")}
        />
        {touched.date && errors.date && (
          <span id="res-date-error" className="field-error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      {/* Time */}
      <div className="form-field">
        <label htmlFor="res-time">Choose time *</label>
        <select
          id="res-time"
          name="time"
          value={time}
          required
          disabled={availableTimes.length === 0}
          aria-required="true"
          aria-invalid={Boolean((touched.time || availableTimes.length === 0) && errors.time)}
          aria-describedby={errors.time ? "res-time-error" : "available-slots-hint"}
          onChange={(e) => {
            setTime(e.target.value);
            markTouched("time");
          }}
          onBlur={() => markTouched("time")}
        >
          {availableTimes.length === 0 ? (
            <option value="">No times available</option>
          ) : (
            availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))
          )}
        </select>

        <div id="available-slots-hint" className="slots-panel" aria-live="polite">
          <span className="slots-label">
            Available slots ({availableTimes.length}):
          </span>
          <div className="slots-list">
            {availableTimes.map((slot) => (
              <BookingSlot
                key={slot}
                time={slot}
                isSelected={slot === time}
                onSelect={(chosen) => {
                  setTime(chosen);
                  markTouched("time");
                }}
              />
            ))}
          </div>
        </div>

        {(touched.time || availableTimes.length === 0) && errors.time && (
          <span id="res-time-error" className="field-error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      {/* Guests */}
      <div className="form-field">
        <label htmlFor="guests">Number of guests *</label>
        <input
          type="number"
          id="guests"
          name="guests"
          placeholder="2"
          min={MIN_GUESTS}
          max={MAX_GUESTS}
          step="1"
          required
          value={guests}
          aria-required="true"
          aria-invalid={Boolean(touched.guests && errors.guests)}
          aria-describedby={touched.guests && errors.guests ? "guests-error" : "guests-hint"}
          onChange={handleGuestsChange}
          onBlur={() => markTouched("guests")}
        />
        <small id="guests-hint" className="field-hint">
          Parties from {MIN_GUESTS} to {MAX_GUESTS} guests can book online.
        </small>
        {touched.guests && errors.guests && (
          <span id="guests-error" className="field-error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      {/* Occasion */}
      <div className="form-field">
        <label htmlFor="occasion">Occasion *</label>
        <select
          id="occasion"
          name="occasion"
          value={occasion}
          required
          aria-required="true"
          aria-invalid={Boolean(touched.occasion && errors.occasion)}
          aria-describedby={touched.occasion && errors.occasion ? "occasion-error" : undefined}
          onChange={(e) => {
            setOccasion(e.target.value);
            markTouched("occasion");
          }}
          onBlur={() => markTouched("occasion")}
        >
          {VALID_OCCASIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {touched.occasion && errors.occasion && (
          <span id="occasion-error" className="field-error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      {/* Seating Preference */}
      <fieldset className="form-fieldset">
        <legend>Seating preference</legend>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="seating"
              value="Indoor"
              checked={seating === "Indoor"}
              onChange={(e) => setSeating(e.target.value)}
            />
            <span>Indoor Dining Room</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="seating"
              value="Outdoor"
              checked={seating === "Outdoor"}
              onChange={(e) => setSeating(e.target.value)}
            />
            <span>Garden Patio</span>
          </label>
        </div>
      </fieldset>

      {/* Optional Confirmation Email */}
      <div className="form-field">
        <label htmlFor="res-email">Confirmation email (optional)</label>
        <input
          type="email"
          id="res-email"
          name="email"
          placeholder="you@example.com"
          value={email}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? "res-email-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            markTouched("email");
          }}
          onBlur={() => markTouched("email")}
        />
        {touched.email && errors.email && (
          <span id="res-email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={!isFormValid}
        aria-label="On Click"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
