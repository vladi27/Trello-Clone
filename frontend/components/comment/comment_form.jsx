import React, { useState } from "react";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import { editCard } from "../../actions/cards_actions";
import TrelloButton from "../trello_button";
import { MenuAltLeft } from "styled-icons/boxicons-regular/MenuAltLeft";

const StyledTextArea = styled(Textarea)`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 50px;
  min-height: 50px;
  background: #fff;
  box-shadow: none;
  border-color: rgba(9, 30, 66, 0.13);
  margin-bottom: 4px;
  margin-right: 10px
  width: 100%;
`;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "", isEditing: false };
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ body: e.currentTarget.value });
  }

  handleNewComment(e) {
    e.preventDefault();
    const username = this.props.username;
    const newComment = Object.assign(
      {},
      {
        body: this.state.body,
        author: username,
        card_id: this.props.card.id,
      }
    );
    this.props.createComment(newComment);
  }

  render() {
    const text = this.state.body;
    return (
      <div>
        <StyledTextArea
          style={{ marginBottom: "4px" }}
          placeholder="Add a comment"
          autoFocus
          value={text}
          onChange={this.handleChange.bind(this)}
          //   onBlur={this.handleCloseForm.bind(this)}
        />

        <TrelloButton onClick={this.handleNewComment.bind(this)}>
          Save
        </TrelloButton>
      </div>
    );
  }
}

export default CommentForm;
