import merge from "lodash/merge";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { REMOVE_BOARD } from "../actions/board_actions";

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case REMOVE_BOARD:
      let user = state[action.userId];
      let recents = user.recent_boards;
      let idx = recents.indexOf(String(action.boardId));
      recents.splice(idx, 1);
      user.recent_boards = recents;
      return merge({}, state, user);

    default:
      return state;
  }
};

export default usersReducer;
