import React from "react";
import queryString from "query-string";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      disabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  updateEmail(e) {
    this.setState({ email: e.currentTarget.value }, () => {
      if (
        this.state.password.length > 0 &&
        this.state.username.length > 0 &&
        this.state.email.length > 0
      ) {
        this.setState({ disabled: false });
      }
    });
  }

  updateUsername(e) {
    this.setState({ username: e.currentTarget.value }, () => {
      if (
        this.state.password.length > 0 &&
        this.state.username.length > 0 &&
        this.state.email.length > 0
      ) {
        this.setState({ disabled: false });
      }
    });
  }

  updatePassword(e) {
    this.setState({ password: e.currentTarget.value }, () => {
      if (
        this.state.password.length > 0 &&
        this.state.username.length > 0 &&
        this.state.email.length > 0
      ) {
        this.setState({ disabled: false });
      }
    });
  }

  createDemoUser(e) {
    e.preventDefault(e);
    const user = Object.assign(
      {},
      {
        username: "random",
        password: "0123456789",
      }
    );
    this.props.processDemo(user);
    this.setState({
      email: "",
      password: "",
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let params = queryString.parse(this.props.location.search);
    let { password, email, username } = this.state;
    const newUser = {
      password,
      email,
      username,
      invite_token: params["invite_token"],
    };
    const user2 = Object.assign({}, newUser);
    this.props.processForm(user2);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <div className="section-wrapper">
          <div className="quick-switch">
            <h1>
              {this.props.formType === "Create a Trello Account"
                ? "Create a Yello Account"
                : "Log in to Yello"}
            </h1>
            <span className="create-account">{this.props.navlink}</span>
            {this.renderErrors()}
            <div className="sign-up-container">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name"> Name </label>
                <input
                  className="signup-form-text-input"
                  type="text"
                  onChange={this.updateUsername.bind(this)}
                  value={this.state.username}
                  placeholder="e.g., Dana Scully"
                />

                <label
                  name={
                    this.props.formType === "Create a Trello Account"
                      ? "signup"
                      : "login"
                  }
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={this.updateEmail.bind(this)}
                  name={
                    this.props.formType === "Create a Trello Account"
                      ? "signup"
                      : "login"
                  }
                  value={this.state.email}
                  placeholder="random@random.com"
                />

                <label htmlFor="password"> Password </label>
                <input
                  type="password"
                  onChange={this.updatePassword.bind(this)}
                  value={this.state.password}
                  placeholder="e.g,***********"
                />

                <input
                  type="submit"
                  value={
                    this.props.formType === "Create a Trello Account"
                      ? "Create New Account"
                      : "Log in"
                  }
                  className={
                    this.state.disabled &&
                    this.props.formType === "Create a Trello Account"
                      ? "disabled"
                      : "real-user"
                  }
                  disabled={
                    this.props.formType === "Create a Trello Account" &&
                    this.state.disabled
                      ? "disabled"
                      : ""
                  }
                />
              </form>
              <button
                id={
                  this.props.formType === "Create a Trello Account"
                    ? "demo"
                    : "login"
                }
                onClick={this.createDemoUser.bind(this)}
              >
                Demo Login
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SessionForm;
