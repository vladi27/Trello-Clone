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

const TextContainer = styled.div`
  margin-bottom: 0;
  padding-bottom: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;

  margin-inline-end: 0px;
  margin: 0 0 8px;
  cursor: pointer;
`;
const BorderFormContainer = styled.div`
  background-color: #fff;
  box-shadow: none;
  border: none;
  border-radius: 3px;
  display: block;
  min-height: 40px;
  padding: 8px 12px;
  text-decoration: none;
  transition: background 0.1s ease-in;
  ${TextContainer}:hover & {
    background: #ccc;
  }
`;
const BodyForm = styled.div`
  // background-color: rgba(9, 30, 66, 0.04);
  // box-shadow: none;
  // border: none;
  // border-radius: 3px;
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  min-height: 40px;
  // padding: 8px 12px;
  text-decoration: none;
  // transition: background 0.3s ease-in;
  // ${TextContainer}:hover & {
  //   background: #ccc;
  // }
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
    this.handleCloseForm();
    this.setState({ body: "" });
  }

  handleCloseForm(e) {
    // e.preventDefault();
    this.setState({ isEditing: false });
  }

  renderEditInput() {
    const placeholder = "Write a comment...";
    const text = this.state.body;

    return (
      <div>
        <StyledTextArea
          style={{ marginBottom: "2px" }}
          placeholder={placeholder}
          autoFocus
          value={text}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleCloseForm.bind(this)}
        />

        <TrelloButton
          disabled={this.state.body ? "true" : ""}
          onClick={this.handleNewComment.bind(this)}
        >
          Save
        </TrelloButton>
      </div>
    );
  }

  render() {
    const text = this.state.body;
    const { isEditing } = this.state;

    return (
      <div>
        {isEditing ? (
          this.renderEditInput()
        ) : (
          <TextContainer>
            <BorderFormContainer
              onClick={() => this.setState({ isEditing: true })}
            >
              <BodyForm>Write a comment...</BodyForm>
            </BorderFormContainer>
          </TextContainer>
        )}
      </div>
    );
  }
}

export default CommentForm;

// <div>
//   <StyledTextArea
//     style={{ marginBottom: "4px" }}
//     placeholder="Add a comment"
//     autoFocus
//     value={text}
//     onChange={this.handleChange.bind(this)}
//     //   onBlur={this.handleCloseForm.bind(this)}
//   />

//   <TrelloButton onClick={this.handleNewComment.bind(this)}>
//     Save
//   </TrelloButton>
// </div>
