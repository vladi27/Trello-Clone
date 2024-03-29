import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import App from "./app";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root;
