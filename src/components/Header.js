import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

/**
 * Semantic site Header containing the Little Lemon brand mark and primary navigation.
 */
function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <Link to="/" className="brand-link" aria-label="Little Lemon Chicago Home">
          <svg
            className="brand-logo"
            width="42"
            height="42"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="14" fill="#495E57" />
            <ellipse
              cx="32"
              cy="32"
              rx="18"
              ry="12"
              transform="rotate(-25 32 32)"
              fill="#F4CE14"
            />
            <path d="M42 18 C48 12, 54 14, 52 21 C47 22, 43 21, 42 18 Z" fill="#A7C957" />
          </svg>
          <span className="brand-text">
            <strong>LITTLE LEMON</strong>
            <small>Chicago</small>
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
