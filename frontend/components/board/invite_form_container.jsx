import { connect } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import { closeModal } from "../../actions/modal_actions";
import Textarea from "react-textarea-autosize";

const InviteBox = styled.div`
  top: 15%;
  left: 50%;
  width: 304px;
  overflow: visible;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  position: absolute;
  right: -9999px;
  z-index: 70;
  display: block;
`;

const PopOverHeader = styled.div`
  height: 40px;
  position: relative;
  margin-bottom: 8px;
  text-align: center;
`;
const PopOverHeaderTitle = styled.span`
  box-sizing: border-box;
  color: #5e6c84;
  display: block;
  line-height: 40px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  margin: 0 12px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;

const PopOverContent = styled.div`
  max-height: 893px;
  padding: 0 12px 12px;
  overflow: visible;
`;

const AutoCompleteContainer = styled.div`
  min-height: 300px;
  position: relative;
  padding-bottom: 48px;
`;

const AutoCompleteEmpty = styled.div`
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  min-height: 40px;
  padding: 4px 8px;
  margin-top: 12px;
  margin: auto;
  max-width: 512px;
  position: relative;
  box-sizing: border-box;
`;
const AutoCompleteSelected = styled.div`
  max-height: 90px;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const AutoCompleteInput = styled.div`
  font-size: 14px;
  height: 24px;
  margin: 3px 7px 3px 0;
  flex: 1;
  min-width: 2px;
  min-height: 0;
  adding: 0;
  width: auto;
  max-width: 100%;
  background-color: transparent;
  border: none;
  box-shadow: none;
  overflow-x: auto;
  overflow-y: hidden;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 100%;
  display: block;
  margin: 12px auto;
  margin-bottom: 0;
  position: absolute;
  bottom: 0;
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
`;

class InviteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", disabled: true };
    this.handleSubmitInvite = this.handleSubmitInvite.bind(this);
  }

  handleSubmitInvite(e) {
    e.preventDefault();
    const boardId = this.props.board.id;
    const email = this.state.email;

    const invite = {
      email,
      user_board_id: boardId,
    };

    const createInvite = (invitation) =>
      $.ajax({
        method: "POST",
        url: `/api/invitations/`,
        data: { invitation },
      });

    createInvite(invite);
    this.props.closeModal();
  }

  updateEmail(e) {
    this.setState({ email: e.currentTarget.value }, () => {
      if (this.state.email.length > 0) {
        this.setState({ disabled: false });
      }
    });
  }

  render() {
    return (
      <InviteBox>
        <PopOverHeader>
          <PopOverHeaderTitle>Invite to Board</PopOverHeaderTitle>
        </PopOverHeader>
        <PopOverContent>
          <AutoCompleteContainer>
            <AutoCompleteEmpty>
              <AutoCompleteSelected>
                <AutoCompleteInput>
                  <input
                    id="subtleStyle"
                    type="email"
                    onChange={this.updateEmail.bind(this)}
                    placeholder="Invite"
                  />
                </AutoCompleteInput>

                {/* <input
                    className="disabled"
                    id="formButton"
                    type="submit"
                    value="Submit Invite"
                    disabled={this.state.disabled ? "disabled" : ""}
                  /> */}
              </AutoCompleteSelected>
            </AutoCompleteEmpty>
            <button
              disabled={this.state.disabled}
              onClick={this.handleSubmitInvite}
              className={
                this.state.disabled ? "submit-button-disabled" : "submit-button"
              }
            >
              Send Invite
            </button>
          </AutoCompleteContainer>
        </PopOverContent>
      </InviteBox>
      // <div className="invite-test">

      // </div>
    );
  }
}

const msp = (state, ownProps) => {
  console.log(state);
  let activeBoard = state.activeBoard;
  let board = state.entities.boards[activeBoard];
  return {
    board,
  };
};

const mdp = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(msp, mdp)(InviteForm);
