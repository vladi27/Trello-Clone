import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from "../actions/comments_actions";
import { RECEIVE_LIST } from "../actions/lists_actions";
import { RECEIVE_BOARD, RECEIVE_BOARDS } from "../actions/board_actions";
import merge from "lodash/merge";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      if (
        action.board.lists &&
        action.board.lists.cards &&
        action.board.lists.cards.comments
      ) {
        const newReceivedComments = action.board.lists.cards.comments;
        console.log(newReceivedComments);
        // const allComments = {};
        // newReceivedComments.forEach((ele) => {
        //   let id = ele.id;
        //   allComments[id] = ele;
        // });
        return merge({}, state, newReceivedComments);
      } else {
        return state;
      }
    case RECEIVE_BOARDS:
      if (action.boards.comments !== undefined) {
        const newReceivedComments2 = action.boards.cards.comments;
        // const allComments2 = {};
        // newReceivedComments2.forEach((ele) => {
        //   let id = ele.id;
        //   allComments2[id] = ele;
        // });
        return merge({}, state, newReceivedComments2);
      } else {
        return state;
      }
    // case RECEIVE_LIST:
    //   const allCards = action.list.cards;
    //   return merge({}, state, allCards);
    case RECEIVE_COMMENTS:
      return merge({}, action.comments);
    case RECEIVE_COMMENT:
      let newComment = { [action.comment.id]: action.comment };
      return merge({}, state, newComment);
    case UPDATE_COMMENT:
      let updatedComment = { [action.comment.id]: action.comment };
      return merge({}, state, updatedComment);
    case REMOVE_COMMENT:
      let newState = merge({}, state);
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default cardsReducer;
