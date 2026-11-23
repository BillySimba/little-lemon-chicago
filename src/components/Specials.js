import React from "react";
import { Link } from "react-router-dom";
import { WEEKLY_SPECIALS } from "../data/menuData";

/**
 * Displays Little Lemon's signature weekly dishes in a responsive CSS Grid.
 */
function Specials() {
  return (
    <section className="specials-section" aria-labelledby="specials-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="specials-heading">This Week&apos;s Specials!</h2>
          <Link to="/menu" className="btn btn-primary" aria-label="Browse Little Lemon online menu">
            Online Menu
          </Link>
        </div>

        <div className="specials-grid">
          {WEEKLY_SPECIALS.map((dish) => (
            <article key={dish.id} className="dish-card">
              <img
                src={dish.image}
                alt={`${dish.title} served at Little Lemon`}
                className="dish-image"
                loading="lazy"
              />
              <div className="dish-body">
                <div className="dish-meta">
                  <h3>{dish.title}</h3>
                  <span className="dish-price">{dish.price}</span>
                </div>
                <p className="dish-desc">{dish.description}</p>
                <Link to="/booking" className="dish-cta">
                  Book a table to enjoy &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specials;
