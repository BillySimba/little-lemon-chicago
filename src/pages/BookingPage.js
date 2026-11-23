import React from "react";
import BookingForm from "../components/BookingForm";

/**
 * Table Reservations page wrapping BookingForm with helpful dining policies and
 * any bookings confirmed during the current session.
 */
function BookingPage({ availableTimes, dispatch, submitForm, bookingHistory = [] }) {
  return (
    <section className="booking-page" aria-labelledby="booking-page-heading">
      <div className="booking-banner">
        <div className="container">
          <h1 id="booking-page-heading">Reserve a Table</h1>
          <p>
            Join us in downtown Chicago for Mediterranean hospitality. Instant online confirmation
            for groups of 1 to 10 guests.
          </p>
        </div>
      </div>

      <div className="container booking-layout">
        <BookingForm
          availableTimes={availableTimes}
          dispatch={dispatch}
          submitForm={submitForm}
        />

        <aside className="booking-sidebar" aria-label="Reservation details and policies">
          <div className="info-card">
            <h2>Dining Information</h2>
            <ul>
              <li>
                <strong>Location:</strong> 420 N Clark St, Chicago, IL 60654
              </li>
              <li>
                <strong>Grace Period:</strong> We hold reserved tables for 15 minutes past your
                booking time.
              </li>
              <li>
                <strong>Large Parties:</strong> For groups over 10 guests, call (312) 555-0194.
              </li>
              <li>
                <strong>Dietary Needs:</strong> Vegetarian, vegan, and gluten-free options are
                always available.
              </li>
            </ul>
          </div>

          {bookingHistory.length > 0 && (
            <div className="info-card">
              <h2>Your Recent Bookings</h2>
              <ul className="recent-list">
                {bookingHistory.map((item, idx) => (
                  <li key={`${item.date}-${item.time}-${idx}`}>
                    <strong>{item.date}</strong> at <strong>{item.time}</strong> &mdash;{" "}
                    {item.guests} {item.guests === 1 ? "guest" : "guests"} ({item.occasion})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default BookingPage;
