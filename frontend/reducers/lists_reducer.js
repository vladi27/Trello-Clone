import {
  RECEIVE_LIST,
  RECEIVE_LISTS,
  DRAG_HAPPENED,
  UPDATE_LIST,
  REMOVE_LIST,
} from "../actions/lists_actions";
import { RECEIVE_BOARD, RECEIVE_BOARDS } from "../actions/board_actions";
import { RECEIVE_CARD, REMOVE_CARD } from "../actions/cards_actions";
import merge from "lodash/merge";

const listsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      if (action.board.lists !== undefined) {
        const newReceivedList = Object.keys(action.board.lists);
        const newList2 = {};
        newReceivedList.forEach((ele) => {
          if (ele !== "cards") {
            let numEle = Number(ele);
            let newListKey = `list-${ele}`;
            newList2[newListKey] = action.board.lists[numEle];
          }
        });
        return merge({}, state, newList2);
      } else {
        return state;
      }

    case RECEIVE_BOARDS:
      if (action.boards.lists !== undefined) {
        const allListsKeys = Object.keys(action.boards.lists);

        const newLists = {};
        allListsKeys.forEach((ele) => {
          let numEle = Number(ele);
          let newListKey = `list-${ele}`;
          newLists[newListKey] = action.boards.lists[numEle];
        });
        return merge({}, state, newLists);
      } else {
        return state;
      }
    case RECEIVE_LISTS:
      // const allLists = action.lists
      // const newAallLists.map
      return merge({}, action.lists);
    case RECEIVE_LIST:
      const receivedList = action.list;

      const newList = { [`list-${receivedList.id}`]: receivedList };
      return merge({}, state, newList);
    case UPDATE_LIST:
      const receivedList2 = action.list;

      const newList2 = { [`list-${receivedList2.id}`]: receivedList2 };
      return merge({}, state, newList2);
    case RECEIVE_CARD:
      const list = state[`list-${action.card.list_id}`];
      // const newList = action.list.id;
      const cardOrder = list.card_positions;
      const newCardId = `card-${action.card.id}`;
      cardOrder.push(newCardId);
      list.card_positions = cardOrder;
      const updatedList = { [`list-${list.id}`]: list };
      return merge({}, state, updatedList);

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type,
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[`list-${droppableIdStart}`];
        const card = list.card_positions.splice(droppableIndexStart, 1);
        list.card_positions.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [`list-${droppableIdStart}`]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[`list-${droppableIdStart}`];
        // pull out the card from this list
        const card = listStart.card_positions.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[`list-${droppableIdEnd}`];

        // put the card in the new list
        listEnd.card_positions.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [`list-${droppableIdStart}`]: listStart,
          [`list-${droppableIdEnd}`]: listEnd,
        };
      }
      return state;

    case REMOVE_LIST:
      let newState = merge({}, state);
      delete newState[`list-${action.listId}`];
      return newState;

    case REMOVE_CARD:
      const list3 = state[`list-${action.listId}`];
      const cardIdx = list3.card_positions.indexOf(`card-${action.cardId}`);
      list3.card_positions.splice(cardIdx, 1);
      const updatedList3 = { [`list-${list3.id}`]: list3 };
      return merge({}, state, updatedList3);

    default:
      return state;
  }
};

export default listsReducer;
