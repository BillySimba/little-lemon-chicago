import React from "react";
import { Link } from "react-router-dom";

/**
 * Semantic site Footer with quick links, Chicago contact info, and dining hours.
 */
function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3>Little Lemon</h3>
          <p>Authentic Mediterranean flavors served with modern hospitality in Chicago.</p>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reserve a Table</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <address className="footer-address">
            <p>420 N Clark St, Chicago, IL 60654</p>
            <p>(312) 555-0194</p>
            <p>reservations@littlelemon.example</p>
          </address>
        </div>

        <div>
          <h4>Hours</h4>
          <ul>
            <li>Mon–Thu: 5:00 PM – 10:00 PM</li>
            <li>Fri–Sat: 5:00 PM – 11:00 PM</li>
            <li>Sun: 4:30 PM – 9:30 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Little Lemon Restaurant, Chicago. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
