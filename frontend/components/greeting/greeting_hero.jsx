import React from "react";
import { Link } from "react-router-dom";
//import pic from "./public/trello.svg";

class GreetingHero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const src = '<%= asset_path("trello.svg") %>';
    console.log({ src });
    return (
      <section id="hero">
        <div className="white-space" />
        <div className="container">
          <h1>Yello lets you work more collaboratively and get more done.</h1>
          <p className="lead">
            Yello’s boards, lists, and cards enable you to organize and
            prioritize your projects in a fun, flexible, and rewarding way.
          </p>
          <p>
            <Link to={`/signup`} className="cta">
              Sign Up - It's Free!
            </Link>
          </p>
          <img src={window.logo} />
        </div>
        <div className="hero-image"></div>
      </section>
    );
  }
}

export default GreetingHero;
