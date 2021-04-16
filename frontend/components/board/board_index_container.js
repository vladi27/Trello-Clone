import { connect } from "react-redux";
import {
  fetchAllBoards,
  updateMostRecentBoards,
} from "../../actions/board_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { logout, update } from "../../actions/session_actions";
import { fetchAllLists } from "../../actions/lists_actions";
import { fetchAllCards } from "../../actions/cards_actions";
import React from "react";
import BoardsIndex from "./boards_index";
import styled from "styled-components";

const BoardThumbnailCreate = styled.div`
  // background-color: rgba(9, 30, 66, 0.04);
  // box-shadow: none;
  // border: none;
  // color: #172b4d;
  // display: table-cell;
  // height: 80px;
  // font-weight: 400;
  // text-align: center;
  // vertical-align: middle;
  // width: inherit;
  // transition-property: background-color, border-color, box-shadow;
  // transition-duration: 85ms;
  // transition-timing-function: ease;
  // cursor: pointer;
  // margin-right: 0;
 border-radius: 3px;
  // // display: block;
  // background-size: cover;
  // background-position: 50%;
  // color: #fff;
  // line-height: 20px;
  // padding: 8px;
  // position: relative;
  text-decoration: none;
  width: 22%;
  height: inherit;
  display: flex;
  font-size: 22px;
 // padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  position: relative;
  vertical-align: middle;
  outline-color: blue;
  box-shadow: none
  border: none;
  color: #172b4d;
  background-color: rgba(9, 30, 66, 0.04);
  // align-self: center;
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
  // overflow: hidden;
  // text-overflow: ellipsis;
  // -webkit-box-orient: vertical;
  // display: -webkit-box;
  line-height: 80px;
  text-align: center;
  display: flex;
  padding-left: 10px
 justify-content: center;
  // margin-top: 0px;
`;

const msp = (state) => {
  console.log(state.entities);
  let ownedBoards = state.entities.boards.ownedBoards || {};
  let sharedBoards = state.entities.boards.sharedBoards || {};
  return {
    // boards: Object.values(state.entities.boards),
    ownedBoards: ownedBoards,
    sharedBoards,
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

// createNewBoard: (
//   <li className="boards-list-item">
//     <div className="board-tile.mod-add">
//       <p
//         className="add-board"
//         onClick={() => dispatch(openModal("create new board"))}
//       >
//         <span className="board-tile-fade" />
//         New Board
//         </p>
//     </div>
//   </li>
// )
