import React from "react";
import { Link } from "react-router-dom";

/**
 * Hero / CallToAction banner guiding visitors directly into the Little Lemon booking flow.
 */
function CallToAction() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            Little Lemon
          </h1>
          <p className="hero-subtitle">Chicago</p>
          <p className="hero-description">
            We are a family-owned Mediterranean restaurant focused on traditional recipes
            served with a modern twist. Reserve your table online for dinner, celebrations,
            or intimate gatherings.
          </p>
          <Link
            to="/booking"
            className="btn btn-primary"
            aria-label="On Click"
          >
            Reserve a Table
          </Link>
        </div>

        <figure className="hero-visual">
          <svg
            viewBox="0 0 520 380"
            className="hero-illustration"
            role="img"
            aria-label="Signature Mediterranean dishes served fresh at Little Lemon Chicago"
          >
            <rect width="520" height="380" rx="20" fill="#3B4D47" />
            <circle cx="260" cy="180" r="115" fill="#FBDABB" opacity="0.2" />
            <circle cx="170" cy="195" r="72" fill="#EE9972" />
            <circle cx="170" cy="195" r="54" fill="#FFFDF7" />
            <circle cx="158" cy="184" r="14" fill="#6B8E23" />
            <circle cx="186" cy="202" r="16" fill="#C94C4C" />
            <circle cx="335" cy="175" r="84" fill="#F4CE14" />
            <circle cx="335" cy="175" r="64" fill="#495E57" />
            <ellipse cx="335" cy="175" rx="34" ry="22" transform="rotate(-20 335 175)" fill="#F4CE14" />
            <text
              x="260"
              y="335"
              textAnchor="middle"
              fill="#EDEFEE"
              fontFamily="Georgia, serif"
              fontSize="18"
              fontWeight="600"
            >
              Fresh Mediterranean Kitchen · Est. Chicago
            </text>
          </svg>
        </figure>
      </div>
    </section>
  );
}

export default CallToAction;
