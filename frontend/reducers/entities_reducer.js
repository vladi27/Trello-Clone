import { combineReducers } from "redux";
import users from "./users_reducer";
import boards from "./boards_reducer";
import lists from "./lists_reducer";
import cards from "./cards_reducer";
import comments from "./comments_reducer";

export default combineReducers({
  users,
  boards,
  lists,
  cards,
  comments,
});
