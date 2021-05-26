import React from "react";
import GreetingNavBar from "./greeting_nav";
import GreetingHero from "./greeting_hero";

const Greeting = ({ currentUser, logout }) => {
  return (
    <div>
      <GreetingNavBar />
      <GreetingHero />
    </div>
  );
};

export default Greeting;
