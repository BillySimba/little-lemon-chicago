import React from "react";
import { Link } from "react-router-dom";

/**
 * Displays confirmation details after a table reservation succeeds via submitAPI.
 */
function ConfirmedBooking({ booking }) {
  return (
    <section className="confirmed-section" aria-labelledby="confirmed-heading">
      <div className="container">
        <div className="confirmed-card" role="status" aria-live="polite">
          <div className="confirmed-badge" aria-hidden="true">
            ✓
          </div>
          <h1 id="confirmed-heading">Your Table Is Confirmed!</h1>
          <p className="confirmed-lead">
            Thank you for choosing Little Lemon Chicago. We look forward to welcoming you.
          </p>

          {booking && (
            <dl className="booking-summary">
              <div>
                <dt>Date</dt>
                <dd>{booking.date}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{booking.time}</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{booking.guests}</dd>
              </div>
              <div>
                <dt>Occasion</dt>
                <dd>{booking.occasion}</dd>
              </div>
              {booking.seating && (
                <div>
                  <dt>Seating</dt>
                  <dd>{booking.seating}</dd>
                </div>
              )}
              {booking.email && (
                <div>
                  <dt>Confirmation Email</dt>
                  <dd>{booking.email}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="confirmed-actions">
            <Link to="/" className="btn btn-primary" aria-label="On Click">
              Return Home
            </Link>
            <Link to="/booking" className="btn btn-secondary" aria-label="On Click">
              Book Another Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
