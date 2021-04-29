export const createComment = (comment) =>
  $.ajax({
    method: "POST",
    url: `/api/comments`,
    data: { comment },
  });

export const deleteComment = (id) =>
  $.ajax({
    method: "DELETE",
    url: `/api/comments/${id}`,
  });

export const editComment = (comment) =>
  $.ajax({
    method: "Patch",
    url: `/api/comments/${comment.id}`,
    data: { comment },
  });

export const fetchComment = (id) =>
  $.ajax({
    method: "GET",
    url: `/api/comment/${id}`,
  });

export const fetchAllComments = () => {
  return $.ajax({
    method: "get",
    url: `api/comments`,
  });
};
