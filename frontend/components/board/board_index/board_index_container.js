import { connect } from "react-redux";
import {
  fetchAllBoards,
  updateMostRecentBoards,
} from "../../../actions/board_actions";
import { openModal, closeModal } from "../../../actions/modal_actions";
import { logout, update } from "../../../actions/session_actions";
import { fetchAllLists } from "../../../actions/lists_actions";
import { fetchAllCards } from "../../../actions/cards_actions";
import React from "react";
import BoardsIndex from "./boards_index";
import styled from "styled-components";

const BoardThumbnailCreate = styled.div`
  border-radius: 3px;
  text-decoration: none;
  width: 22%;
  height: inherit;
  display: flex;
  font-size: 22px;
  box-sizing: border-box;
  border: none;
  position: relative;
  vertical-align: middle;
  outline-color: blue;
  box-shadow: none
  color: #172b4d;
  background-color: rgba(9, 30, 66, 0.04);
  margin-right: 0;
  padding: 8px;
  margin: 0 2% 8px 0;
  cursor: pointer;
`;

const BoardTitleCreate = styled.h3`
  color: #172b4d
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 80px;
  text-align: center;
  display: flex;
  padding-left: 10px
 justify-content: center;
`;

const msp = (state) => {
  const ownedBoards = [];
  const sharedBoards = [];
  const boards = Object.values(state.entities.boards);
  boards.forEach((board) => {
    if ("shared_board" in board) {
      sharedBoards.push(board);
    } else {
      ownedBoards.push(board);
    }
  });

  return {
    boards,
    ownedBoards,
    sharedBoards,
    allBoards: state.entities.boards,
    recentActiveBoards: Object.values(state.entities.users)[0].recent_boards,
    user: state.entities.users,
  };
};

const mdp = (dispatch) => ({
  fetchAllBoards: () => dispatch(fetchAllBoards()),
  fetchAllLists: () => dispatch(fetchAllLists()),
  fetchAllCards: () => dispatch(fetchAllCards()),
  update: (user) => dispatch(update(user)),
  logout: () => dispatch(logout()),
  updateMostRecentBoards: (recentBoards) =>
    dispatch(updateMostRecentBoards(recentBoards)),
  createNewBoard: (
    <BoardThumbnailCreate
      onClick={() => dispatch(openModal("create new board"))}
    >
      <BoardTitleCreate>Create new Board</BoardTitleCreate>
    </BoardThumbnailCreate>
  ),
});

export default connect(msp, mdp)(BoardsIndex);
