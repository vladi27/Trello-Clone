import {
  RECEIVE_BOARDS,
  RECEIVE_BOARD,
  REMOVE_BOARD,
} from "../actions/board_actions";
import { RECEIVE_LIST, REMOVE_LIST } from "../actions/lists_actions";
import merge from "lodash/merge";
import { DRAG_HAPPENED } from "../actions/lists_actions";

const boardsReducer = (obj = {}, action) => {
  switch (action.type) {
    case RECEIVE_BOARDS: {
      const arr = ["cards", "lists", "comments"];
      const allBoards = {};
      const receivedBoards = Object.keys(action.boards);
      receivedBoards.forEach((key) => {
        if (arr.indexOf(key) === -1) {
          let receivedBoard = action.boards[key];
          allBoards[key] = receivedBoard;
        }
      });
      return merge({}, obj, allBoards);
    }
    case RECEIVE_BOARD: {
      const newBoardtoReturn = { [action.board.id]: action.board };
      return merge({}, obj, newBoardtoReturn);
    }
    case REMOVE_BOARD: {
      const nextState = merge({}, obj);
      delete nextState[action.boardId];
      return nextState;
    }

    case REMOVE_LIST: {
      const board = obj[action.boardId];
      const listIdx = board.list_positions.indexOf(`list-${action.listId}`);
      board.list_positions.splice(listIdx, 1);
      const updatedBoard = { [board.id]: board };
      return merge({}, obj, updatedBoard);
    }
    case RECEIVE_LIST: {
      const boardToUpdate = obj[action.list.board_id];
      const listOrder = boardToUpdate.list_positions;
      const newListId = `list-${action.list.id}`;
      listOrder.push(newListId);
      boardToUpdate.list_positions = listOrder;
      const newBoard = { [boardToUpdate.id]: boardToUpdate };
      return merge({}, obj, newBoard);
    }
    case DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = obj[boardID];
      const lists = board.list_positions;

      const { droppableIndexEnd, droppableIndexStart, type } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.list_positions = lists;
        const newBoard = { [board.id]: board };
        return merge({}, obj, newBoard);
      }
      return merge({}, obj);
    }
    default:
      return obj;
  }
};

export default boardsReducer;
