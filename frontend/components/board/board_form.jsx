import React from "react";
import { connect } from "react-redux";
import { createBoard } from "../../actions/board_actions";
import { withRouter } from "react-router-dom";
import ls from "local-storage";
import { Close } from "styled-icons/material/Close";
import styled from "styled-components";

const CloseButton = styled(Close)`
  float: right;
  position: relative;
  right: -2px;
  top: -2px;
  z-index: 2;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  width: 20px;
  color: white;
  cursor: pointer;
`;

class BoardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTitle(e) {
    this.setState({ title: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const board = Object.assign({}, this.state);
    const receivedUser = this.props.user;
    const userID = Number(Object.keys(receivedUser)[0]);
    const currentBoards = this.props.recentActiveBoards.slice();
    this.props
      .createBoard(board)
      .then((payload) => {
        let board = payload.board;
        let mostRecentArray = [];
        if (currentBoards.length > 3) {
          let currents = currentBoards.slice();
          currents.shift();
          mostRecentArray = [...currents, String(board.id)];
        } else {
          mostRecentArray = [...currentBoards, String(board.id)];
        }
        let user = Object.assign(
          {},
          {
            recent_boards: mostRecentArray,
            id: userID,
          }
        );
        this.props.update(user);
        this.props.history.push(`/boards/${board.id}`);
      })
      .then(() => this.props.closeModal());
  }

  render() {
    return (
      <div className="newboard">
        <CloseButton onClick={() => this.props.closeModal()}></CloseButton>
        <form onSubmit={this.handleSubmit}>
          <div className="boardWrapper">
            <input
              id="subtleStyle"
              type="text"
              onChange={this.updateTitle.bind(this)}
              value={this.state.title}
              placeholder="Add Board Title"
            />
          </div>

          <input
            className="disabled"
            id="formButton"
            type="submit"
            disabled={this.state.title ? "" : "disabled"}
            value="Create Board"
          />
        </form>
      </div>
    );
  }
}

export default BoardForm;
