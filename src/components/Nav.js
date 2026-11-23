import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Responsive primary navigation bar with keyboard-accessible mobile menu toggle.
 */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/booking", label: "Reservations" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav" aria-label="Primary Navigation">
      <button
        type="button"
        className="nav-toggle"
        aria-label="On Click"
        aria-expanded={menuOpen}
        aria-controls="primary-nav-list"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="sr-only">Toggle navigation menu</span>
      </button>

      <ul id="primary-nav-list" className={`nav-list ${menuOpen ? "nav-list--open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
