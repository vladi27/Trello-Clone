import { combineReducers } from "redux";
import entities from "./entities_reducer";
import session from "./session_reducer";
import errors from "./errors_reducer";
import ui from "./ui_reducer";
import activeBoardReducer from "./active_board_reducer";
import activeCardReducer from "./active_card_reducer";
import mostRecentBoardsReducer from "./most_recent_boards_reducer";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_CURRENT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  recentActiveBoards: mostRecentBoardsReducer,
});

export default rootReducer;
