import React from "react";
import Chicago from "../components/Chicago";
import CustomersSay from "../components/CustomersSay";

function AboutPage() {
  return (
    <>
      <section className="page-header-band">
        <div className="container">
          <h1>Our Story</h1>
          <p>Mediterranean warmth meets modern Chicago dining.</p>
        </div>
      </section>
      <Chicago />
      <CustomersSay />
    </>
  );
}

export default AboutPage;
