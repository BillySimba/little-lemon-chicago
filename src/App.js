import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

/**
 * Root application component using a React Fragment around semantic landmarks
 * (header, main, footer) and a keyboard-accessible skip link.
 */
function App() {
  return (
    <BrowserRouter>
      <>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <Main />
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
