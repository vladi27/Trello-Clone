import * as APIUtil from "../util/comment_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
// export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const createComment = (comment) => (dispatch) =>
  APIUtil.createComment(comment).then((comment) =>
    dispatch(receiveComment(comment))
  );

export const fetchAllComments = () => (dispatch) => {
  APIUtil.fetchAllComments().then((payload) =>
    dispatch(receiveComments(payload))
  );
};

export const editComment = (comment) => (dispatch) =>
  APIUtil.editComment(comment).then((comment) =>
    dispatch(updateComment(comment))
  );

export const deleteComment = (commentId) => (dispatch) =>
  APIUtil.deleteComment(commentId).then(() =>
    dispatch(removeComment(commentId))
  );

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

// export const setActiveCard = (id) => {
//   return {
//     type: SET_ACTIVE_CARD,
//     payload: `card-${id}`,
//   };
// };
