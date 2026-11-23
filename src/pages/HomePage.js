import React from "react";
import CallToAction from "../components/CallToAction";
import Specials from "../components/Specials";
import CustomersSay from "../components/CustomersSay";
import Chicago from "../components/Chicago";

/**
 * Landing page combining Hero CTA, weekly specials, testimonials, and Chicago story.
 */
function HomePage() {
  return (
    <>
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </>
  );
}

export default HomePage;
