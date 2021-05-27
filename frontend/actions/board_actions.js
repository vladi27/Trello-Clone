import * as APIUtil from "../util/board_api_util";

export const RECEIVE_BOARDS = "RECEIVE_BOARDS";
export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const RECEIVE_BOARD_ERRORS = "RECEIVE_BOARD_ERRORS";
export const CLEAR_BOARD_ERRORS = "CLEAR_BOARD_ERRORS";
export const SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD";
export const UPDATE_MOST_RECENT_BOARDS = "UPDATE_MOST_RECENT_BOARDS";

export const fetchAllBoards = () => (dispatch) =>
  APIUtil.fetchAllBoards().then((payload) => dispatch(receiveBoards(payload)));

export const fetchBoard = (id) => (dispatch) =>
  APIUtil.fetchBoard(id).then((board) => dispatch(receiveBoard(board)));

export const createBoard = (board) => (dispatch) =>
  APIUtil.createBoard(board).then(
    (board) => dispatch(receiveBoard(board)),
    (errors) => dispatch(receiveErrors(errors))
  );
export const updateBoard = (board) => (dispatch) =>
  APIUtil.updateBoard(board).then(
    (board) => dispatch(receiveBoard(board)),
    (errors) => dispatch(receiveErrors(errors))
  );

export const deleteBoard = (boardId, userId) => (dispatch) =>
  APIUtil.deleteBoard(boardId).then(() =>
    dispatch(removeBoard(boardId, userId))
  );

export const receiveBoards = (boards) => {
  return {
    type: RECEIVE_BOARDS,
    boards,
  };
};

export const receiveBoard = (board) => ({
  type: RECEIVE_BOARD,
  board,
});

const removeBoard = (boardId, userId) => ({
  type: REMOVE_BOARD,
  boardId,
  userId,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_BOARD_ERRORS,
  errors,
});

export const updateMostRecentBoards = (recentBoards) => {
  return { type: UPDATE_MOST_RECENT_BOARDS, recentBoards };
};

export const clearErrors = () => ({
  errors: [],
  type: CLEAR_BOARD_ERRORS,
});

export const setActiveBoard = (id) => {
  return {
    type: SET_ACTIVE_BOARD,
    payload: id,
  };
};
