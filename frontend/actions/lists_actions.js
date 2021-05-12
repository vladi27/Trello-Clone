import * as APIUtil from "../util/list_api_util";

export const RECEIVE_LIST = "RECEIVE_LIST";
export const DRAG_HAPPENED = "DRAG_HAPPENED";
export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const UPDATE_LIST = "UPDATE_LIST";
export const REMOVE_LIST = "REMOVE_LIST";

export const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list,
});

const removeList = (listId, boardId) => ({
  type: REMOVE_LIST,
  listId,
  boardId,
});

export const deleteList = (listId, boardId) => (dispatch) =>
  APIUtil.deleteList(listId).then(() => dispatch(removeList(listId, boardId)));

export const updateList = (list) => ({
  type: UPDATE_LIST,
  list,
});

export const createList = (list) => (dispatch) =>
  APIUtil.createList(list).then((list) => dispatch(receiveList(list)));

export const editList = (list) => (dispatch) =>
  APIUtil.updateList(list).then((list) => dispatch(updateList(list)));

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
  boardID
) => (dispatch) =>
  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId,
      type,
      boardID,
    },
  });

export const fetchAllLists = () => (dispatch) => {
  APIUtil.fetchAllLists().then((payload) => dispatch(receiveLists(payload)));
};

export const receiveLists = (lists) => ({
  type: RECEIVE_LISTS,
  lists,
});
