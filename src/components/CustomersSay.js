import React from "react";
import { TESTIMONIALS } from "../data/menuData";

/**
 * Customer testimonials section showcasing star ratings and guest reviews.
 */
function CustomersSay() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="container">
        <h2 id="testimonials-heading" className="centered-heading">
          What Our Guests Say
        </h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className="testimonial-card">
              <p className="testimonial-stars" aria-label={`${item.rating} out of 5 stars`}>
                {"★".repeat(item.rating)}
              </p>
              <div className="testimonial-author">
                <span className="avatar-badge" aria-hidden="true">
                  {item.initials}
                </span>
                <h3>{item.name}</h3>
              </div>
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomersSay;
