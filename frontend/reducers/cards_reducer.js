import {
  RECEIVE_CARD,
  RECEIVE_CARDS,
  UPDATE_CARD,
  REMOVE_CARD,
} from "../actions/cards_actions";
import { RECEIVE_LIST } from "../actions/lists_actions";
import { RECEIVE_BOARD, RECEIVE_BOARDS } from "../actions/board_actions";
import merge from "lodash/merge";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD: {
      if (action.board.lists && action.board.lists.cards) {
        const newReceivedCard = Object.keys(action.board.lists.cards);
        const newCard = {};
        newReceivedCard.forEach((ele) => {
          if (ele !== "comments") {
            let numEle = Number(ele);
            let newCardKey = `card-${ele}`;
            newCard[newCardKey] = action.board.lists.cards[numEle];
          }
        });
        return merge({}, state, newCard);
      } else {
        return state;
      }
    }
    case RECEIVE_BOARDS: {
      if (action.boards.cards !== undefined) {
        const newReceivedCard = Object.keys(action.boards.cards);
        const newCard = {};
        newReceivedCard.forEach((ele) => {
          let numEle = Number(ele);
          let newCardKey = `card-${ele}`;
          newCard[newCardKey] = action.boards.cards[numEle];
        });
        return merge({}, state, newCard);
      } else {
        return state;
      }
    }

    case RECEIVE_CARDS: {
      return merge({}, action.cards);
    }
    case RECEIVE_CARD: {
      const newCard = { [`card-${action.card.id}`]: action.card };
      return merge({}, state, newCard);
    }
    case UPDATE_CARD: {
      const newCard = { [`card-${action.card.id}`]: action.card };
      return merge({}, state, newCard);
    }
    case REMOVE_CARD: {
      const newState = merge({}, state);
      delete newState[`card-${action.cardId}`];
      return newState;
    }
    default:
      return state;
  }
};

export default cardsReducer;
