import { connect } from "react-redux";
import {
  createBoard,
  updateMostRecentBoards,
} from "../../actions/board_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import BoardForm from "./board_form";
import { logout, update } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import * as APIUtil from "../../util/board_api_util";

const msp = (state, ownProps) => {
  return {
    errors: state.errors.boardErrors,
    recentActiveBoards: Object.values(state.entities.users)[0].recent_boards,
    user: state.entities.users,
  };
};

const mdp = (dispatch) => {
  return {
    createBoard: (board) => dispatch(createBoard(board)),
    closeModal: () => dispatch(closeModal()),
    update: (user) => dispatch(update(user)),
    updateMostRecentBoards: (recentBoards) =>
      dispatch(updateMostRecentBoards(recentBoards)),
  };
};

const BoardFormWithRouter = withRouter(BoardForm);
export default connect(msp, mdp)(BoardFormWithRouter);
