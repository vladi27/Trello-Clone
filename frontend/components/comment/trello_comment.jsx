import React, { useState } from "react";
import styled from "styled-components";
import CommentInitials from "../card/initials";
import Textarea from "react-textarea-autosize";
import TrelloButton from "../trello_button";
import moment from "moment";
// const moment = require("moment");

const ActionComment = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  box-sizing: border-box;
  clear: both;
  display: inline-block;
  margin: 4px 2px 4px -38px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
const CurrentComment = styled.div`
  padding: 8px 12px;
`;

const CommentContainer = styled.div`
  margin-left: 40px;
  min-height: 32px;

  position: relative;
  padding: 8px 0 8px 48px;
  margin: 0 0 0 -12px;
`;
const MemberInitialsContainer = styled.div`
  height: 32px;
  left: -28px;
  position: absolute;
  top: 8px;
  width: 32px;
`;

const PhenomDesc = styled.div`
  margin: 0;
  margin-left: -35px
  word-wrap: break-word;
  display: block;
`;

const CommentAuthor = styled.span`
  font-weight: 700;
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  line-height: 20px;
`;

const DateContainer = styled.span`
  line-height: 14px;
  margin: 0 0 6px;
  min-width: 105px;
  ont-size: 8px;
  font-weight: 200;
  white-space: pre;
  text-decoration: none;
`;

const CommentActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 24px;
  margin-right: 24px;
  margin-left: -35px;
`;

const ActionPos = styled.div`
  align-self: flex-start;
`;

const Action = styled.span`
  font-size: 12px;
  margin: 0;
  min-width: 110px;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: underline;
  color: #5e6c84;
`;
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
  margin-top: 4px
  margin-right: 10px
  padding: 0 5px
  width: 100%;
`;

const TextContainer = styled.div`
  margin-left: -30px;
`;

const CommentText = styled.div``;

class TrelloComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "", isEditing: false };
  }

  handleDeleteComment(e) {
    let commentId = this.props.comment.id;
    this.props.deleteComment(commentId);
  }

  componentDidMount() {
    this.setState({
      body: this.props.comment.body,
    });
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ body: e.currentTarget.value });
  }
  handleFocus(e) {
    let val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  handleCloseForm(e) {
    // e.preventDefault();
    this.setState({ isEditing: false, body: this.props.comment.body });
  }
  handleEditComment(e) {
    e.preventDefault();
    let newComment = Object.assign(
      {},
      {
        body: this.state.body,
        id: this.props.comment.id,
      }
    );
    this.props
      .editComment(newComment)
      .then(this.setState({ isEditing: false }));
  }

  handleDate() {
    let comment = this.props.comment;
    let formattedDate;
    if (new Date(comment["updated_at"]) > new Date(comment["created_at"])) {
      let dateUpdated = comment["updated_at"];
      let localDate = moment(dateUpdated).local().format("MM-DD hh:mm A");
      formattedDate = localDate + "(edited)";
    } else {
      let dateCreated = this.props.comment["created_at"];
      formattedDate = moment(dateCreated).local().format("MM-DD hh:mm A");
    }
    return formattedDate;
  }
  renderEditInput() {
    const text = this.state.body;

    return (
      <div>
        <TextContainer>
          <StyledTextArea
            style={{ marginBottom: "2px" }}
            autoFocus
            value={text}
            onFocus={this.handleFocus}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleCloseForm.bind(this)}
          />

          <TrelloButton
            disabled={this.state.body ? "true" : ""}
            onClick={this.handleEditComment.bind(this)}
          >
            Save
          </TrelloButton>
        </TextContainer>
      </div>
    );
  }

  render() {
    const body = this.props.comment.body;
    const author = this.props.comment.author;
    const initial = author.slice(0, 2).toUpperCase();
    const { username } = this.props;
    let { isEditing } = this.state;
    let dateModified = this.handleDate();

    return (
      <CommentContainer>
        <MemberInitialsContainer>
          <CommentInitials username={initial}></CommentInitials>
        </MemberInitialsContainer>
        <PhenomDesc>
          <CommentAuthor>{this.props.comment.author}</CommentAuthor>
          <DateContainer> {dateModified}</DateContainer>{" "}
        </PhenomDesc>
        <div>
          {isEditing ? (
            this.renderEditInput()
          ) : (
            <ActionComment>
              <CurrentComment>
                <CommentText>{body}</CommentText>
              </CurrentComment>
            </ActionComment>
          )}
        </div>
        <div>
          {username === author ? (
            <CommentActions>
              <ActionPos>
                <Action onClick={() => this.setState({ isEditing: true })}>
                  Edit
                </Action>
                <Action onClick={this.handleDeleteComment.bind(this)}>
                  Delete
                </Action>
              </ActionPos>
            </CommentActions>
          ) : (
            <div></div>
          )}
        </div>
      </CommentContainer>
    );
  }
}

export default TrelloComment;
