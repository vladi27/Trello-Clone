import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import GreetingContainer from "./greeting/greeting_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import LogInFormContainer from "./session_form/login_form_container";
import BoardsIndexContainer from "./board/board_index/board_index_container";
import NavBarContainer from "./nav_bar/nav_bar_container";
import BoardShow from "./board/show_board";
import Modal from "./modal/modal";

const App = () => (
  <div>
    <Modal />

    <Switch>
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <AuthRoute path="/login" component={LogInFormContainer} />
      <ProtectedRoute path="/boards/:boardId" component={BoardShow} />
      <ProtectedRoute path="/boards" component={BoardsIndexContainer} />
      <AuthRoute path="/" component={GreetingContainer} />
      <Redirect to="/login" />
    </Switch>
  </div>
);

export default App;
