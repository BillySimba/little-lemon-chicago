import React from "react";

/**
 * Restaurant story section introducing founders Adrian and Mario in Chicago.
 */
function Chicago() {
  return (
    <section className="chicago-section" aria-labelledby="chicago-heading">
      <div className="container chicago-grid">
        <div className="chicago-copy">
          <h2 id="chicago-heading">Little Lemon</h2>
          <p className="chicago-city">Chicago</p>
          <p>
            Founded by brothers Adrian and Mario, Little Lemon brings together Italian, Greek,
            and Turkish culinary traditions with locally sourced Midwest produce. Every dish is
            prepared daily from scratch in our open kitchen.
          </p>
          <p>
            Whether you are planning a quiet evening for two, a birthday celebration, or a
            business dinner, our online reservation tool makes securing your table effortless.
          </p>
        </div>

        <div className="chicago-cards" aria-hidden="true">
          <div className="story-tile story-tile--primary">
            <span>Mario &amp; Adrian</span>
            <small>Co-Founders &amp; Chefs</small>
          </div>
          <div className="story-tile story-tile--accent">
            <span>420 N Clark St</span>
            <small>Downtown Chicago, IL</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chicago;
