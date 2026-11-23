import React from "react";
import Specials from "../components/Specials";

function MenuPage() {
  return (
    <>
      <section className="page-header-band">
        <div className="container">
          <h1>Little Lemon Menu</h1>
          <p>Fresh seasonal ingredients prepared daily from family recipes.</p>
        </div>
      </section>
      <Specials />
    </>
  );
}

export default MenuPage;
