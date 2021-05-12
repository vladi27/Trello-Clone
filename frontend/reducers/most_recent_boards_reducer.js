import {
  UPDATE_MOST_RECENT_BOARDS,
  REMOVE_BOARD,
} from "../actions/board_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
const initialState = [];
const mostRecentBoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOST_RECENT_BOARDS:
      return action.recentBoards;
    case RECEIVE_CURRENT_USER:
      return action.currentUser.recent_boards;
    case REMOVE_BOARD:
      let idx = state.indexOf(String(action.boardId));
      state.splice(idx, 1);
      return state;

    default:
      return state;
  }
};

export default mostRecentBoardsReducer;
