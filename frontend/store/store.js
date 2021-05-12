import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as APIUtil from "../util/board_api_util";
import * as APBUtil from "../util/list_api_util";
import * as APCUtil from "../util/card_api_util";
import * as APSUtil from "../util/session_api_util";
import { receiveBoard } from "../actions/board_actions";
import { updateCard, removeCard } from "../actions/cards_actions";
import { receiveList } from "../actions/lists_actions";
import rootReducer from "../reducers/root_reducer";

const persistenceActionTypes = [
  "DRAG_HAPPENED",
  "RECEIVE_LIST",
  "RECEIVE_CARD",
  "REMOVE_CARD",
  "REMOVE_LIST",
  "REMOVE_BOARD",
];

//custom middleware
const persistenceMiddleware = (store) => (dispatch) => (action) => {
  const result = dispatch(action);

  if (persistenceActionTypes.indexOf(action.type) > -1) {
    if (action.type === "REMOVE_BOARD") {
      updateUser(action, store);
    } else if (action.type === "REMOVE_LIST") {
      removeListfromBoard(action, store);
    } else if (action.type === "REMOVE_CARD") {
      removeCardfromList(action, store);
    } else if (action.type === "RECEIVE_LIST") {
      saveUpdatedBoard(action, store);
    } else if (action.type === "RECEIVE_CARD") {
      saveUpdatedList(action, store);
    } else {
      if (action.payload.type === "list") {
        sendToBackendBoard(action, store);
      } else if (
        action.payload.droppableIdStart === action.payload.droppableIdEnd &&
        action.payload.type === "card"
      ) {
        sendToBackendSameList(action, store);
      } else if (
        action.payload.droppableIdStart !== action.payload.droppableIdEnd &&
        action.payload.type === "card"
      ) {
        sendToBackendDifferentLists(action, store);
      }
    }
  }
  return result;
};

const saveUpdatedList = (action, store) => {
  const updatedList = store.getState().entities.lists[
    `list-${action.card.list_id}`
  ];
  const list = Object.assign(
    {},
    {
      id: updatedList.id,
      card_positions: updatedList.card_positions,
    }
  );

  APBUtil.updateCardPositions(list);
};

const updateUser = (action, store) => {
  const user = store.getState().entities.users[action.userId];
  const updatedUser = Object.assign(
    {},
    {
      id: user.id,
      recent_boards: user.recent_boards,
    }
  );
  APSUtil.updateRecentBoards(updatedUser);
};

const removeCardfromList = (action, store) => {
  const updatedList = store.getState().entities.lists[`list-${action.listId}`];
  const list = Object.assign(
    {},
    {
      id: updatedList.id,
      card_positions: updatedList.card_positions,
    }
  );

  APBUtil.updateCardPositions(list);
};
const removeListfromBoard = (action, store) => {
  const updatedBoard = store.getState().entities.boards[action.boardId];
  const board = Object.assign(
    {},
    {
      id: updatedBoard.id,
      list_positions: updatedBoard.list_positions,
    }
  );

  APIUtil.updateListPositions(board);
};

const saveUpdatedBoard = (action, store) => {
  const updatedBoard1 = store.getState().entities.boards[action.list.board_id];
  const board1 = Object.assign(
    {},
    {
      id: updatedBoard1.id,
      list_positions: updatedBoard1.list_positions,
    }
  );

  APIUtil.updateListPositions(board1);
};

const sendToBackendDifferentLists = (action, store) => {
  //starting list
  const updatedList1 = store.getState().entities.lists[
    `list-${action.payload.droppableIdStart}`
  ];
  // destination list
  const updatedList2 = store.getState().entities.lists[
    `list-${action.payload.droppableIdEnd}`
  ];

  const list = Object.assign(
    {},
    {
      id: updatedList1.id,
      card_positions: updatedList1.card_positions,
    }
  );
  const list2 = Object.assign(
    {},
    {
      id: updatedList2.id,
      card_positions: updatedList2.card_positions,
    }
  );

  APBUtil.updateCardPositions(list);
  APBUtil.updateCardPositions(list2);

  //updating cards' list_ids
  updatedList2.card_positions.forEach((id) => {
    let card2 = store.getState().entities.cards[id];

    if (card2.list_id !== updatedList2.id) {
      let newCard2 = Object.assign(
        {},
        {
          id: card2.id,
          list_id: updatedList2.id,
        }
      );

      APCUtil.editCard(newCard2).then((card) => {
        store.dispatch(updateCard(card));
      });
    }
  });
};

const sendToBackendSameList = (action, store) => {
  const updatedList = store.getState().entities.lists[
    `list-${action.payload.droppableIdStart}`
  ];
  const list = Object.assign(
    {},
    {
      id: updatedList.id,
      card_positions: updatedList.card_positions,
    }
  );

  APBUtil.updateCardPositions(list);
};

const sendToBackendBoard = (action, store) => {
  const updatedBoard = store.getState().entities.boards[action.payload.boardID];
  const board = Object.assign(
    {},
    {
      id: updatedBoard.id,
      list_positions: updatedBoard.list_positions,
    }
  );

  APIUtil.updateListPositions(board);
};

const configureStore = (preloadedState = {}) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger, persistenceMiddleware)
  );

export default configureStore;
