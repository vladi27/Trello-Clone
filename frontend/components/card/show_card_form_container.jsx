import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";
import { editCard } from "../../actions/cards_actions";
import {
  createComment,
  deleteComment,
  editComment,
} from "../../actions/comments_actions";
import CardDescriptionForm from "./card_description_form";
import CommentInitials from "./initials";
import TrelloCalendar from "./schedule_deadline/calendar";
import CompletedBanner from "./schedule_deadline/completed_banner";
import CommentForm from "../comment/comment_form";
import TrelloComment from "../comment/trello_comment";
import { Close } from "styled-icons/material/Close";
import { closeModal } from "../../actions/modal_actions";
import { CreditCard } from "styled-icons/boxicons-regular/CreditCard";
import { Clock } from "styled-icons/fa-regular/Clock";

const ModalWrapper = styled.div`
  margin-left: 40px;
  margin-top: 15px;
`;

const HeaderContainer = styled.div`
  margin: 12px 40px 8px 56px;
  min-height: 32px;
  position: relative;
  z-index: 1;

  // justify-content: start;
`;

const CardIcon = styled(CreditCard)`
  left: -35px;
  top: 4px;
  position: absolute;
  color: #42526e;
  height: 32px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
`;
const TimeIcon = styled(Clock)`
  left: -35px;
  position: absolute;
  color: #42526e;
  height: 32px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
`;

const CloseButton = styled(Close)`
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  height: 22px;
  overflow: hidden;
  padding: 4px;
  margin: 4px;
  width: 22px;
  z-index: 2;
  transition: background-color 0.1s, color 0.1s;
  font-size: 24px;
  line-height: 32px;
  cursor: pointer;
  color: #42526e;
`;

const CardTitle = styled.h2`
  margin-right: 4px;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  font-family: Helvetica Neue, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

const ListReference = styled.div`
  display: inline-block;
  margin: 4px 8px 4px 2px;
  color: #6b778c;
  position: relative;
`;

const TitleContainer = styled.div`
  cursor: pointer;
  min-height: 32px;
  padding: 8px 0 0;
  margin: 4px 0 0;
`;

const StyledInput = styled.input`
  width: 70%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  background: #fff;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
  resize: none;
  box-shadow: inset 0 0 0 2px #dfe1e6;
`;

const MemberInitialsContainer = styled.div`
  position: absolute;
  left: -40px;
`;

class ShowCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.card.title,
      isEditing: false,
      showCalendar: false,
      sortedComments: [],
    };
    this.handleFinishEditing = this.handleFinishEditing.bind(this);
  }

  handleCloseForm(e) {
    const currentTitle = this.props.card.title;
    if (this.state.title !== currentTitle) {
      const newCard = Object.assign(
        {},
        {
          title: this.state.title,
          id: this.props.card.id,
        }
      );
      this.props.editCard(newCard).then(this.setState({ isEditing: false }));
    } else {
      this.setState({ isEditing: false });
    }
  }

  handleFocus(e) {
    let val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ title: e.currentTarget.value });
  }

  handleFinishEditing(e) {
    e.preventDefault();
    const newCard = Object.assign(
      {},
      {
        title: this.state.title,
        id: this.props.card.id,
      }
    );
    this.props.editCard(newCard).then(this.setState({ isEditing: false }));
  }

  sortComments(dateArray) {
    let sorted = dateArray.sort((a, b) => this.desc(a, b));
    return sorted;
  }

  desc(a, b) {
    const aDate = a["updated_at"]
      ? new Date(a["updated_at"])
      : new Date(a["created_at"]);
    const bDate = b["updated_at"]
      ? new Date(b["updated_at"])
      : new Date(b["created_at"]);
    return bDate.getTime() - aDate.getTime();
  }

  renderEditInput() {
    let styles = {
      overflow: "hidden",
      overflowWrap: "break-word",
      height: "25px",
    };
    return (
      <form onSubmit={this.handleFinishEditing}>
        <StyledInput
          style={styles}
          dir="auto"
          type="text"
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
          autoFocus
          onFocus={this.handleFocus}
          onBlur={this.handleCloseForm.bind(this)}
          onKeyDown={(e) => {
            if (e.key == 13) {
              this.handleFinishEditing;
            }
          }}
        />
      </form>
    );
  }

  render() {
    const { title } = this.props.card;
    const dueDate = this.props.card["due_date"];
    const list = this.props.lists[`list-${this.props.card.list_id}`];
    const { isEditing } = this.state;
    const comments = Object.values(this.props.comments).filter((comment) => {
      let cardId = this.props.card.id;
      if (cardId === comment.card_id) {
        return comment;
      }
    });
    const sortedComments = this.sortComments(comments.slice());
    const username = this.props.username;
    const initial = username.slice(0, 2).toUpperCase();

    return (
      <div>
        <CloseButton onClick={this.props.closeModal} />
        <div>
          <TrelloCalendar
            card={this.props.card}
            editCard={this.props.editCard}
          />
        </div>

        <HeaderContainer>
          <CardIcon size="10" />
          {isEditing ? (
            this.renderEditInput()
          ) : (
            <TitleContainer onClick={() => this.setState({ isEditing: true })}>
              {" "}
              <CardTitle>{title}</CardTitle>
              <ListReference>{`in list ${list.title}`}</ListReference>
            </TitleContainer>
          )}
          <ModalWrapper />
          {dueDate ? (
            <CompletedBanner
              editCard={this.props.editCard}
              card={this.props.card}
              completed={this.props.card.completed}
            ></CompletedBanner>
          ) : (
            <div></div>
          )}

          <CardDescriptionForm
            card={this.props.card}
            editCard={this.props.editCard}
          />

          <CardIcon size="10" />

          <MemberInitialsContainer>
            <CommentInitials username={initial}></CommentInitials>
          </MemberInitialsContainer>
          <CommentForm
            username={this.props.username}
            createComment={this.props.createComment}
            card={this.props.card}
          />
          {sortedComments.map((comment) => (
            <TrelloComment
              comment={comment}
              deleteComment={this.props.deleteComment}
              editComment={this.props.editComment}
              username={username}
              key={comment.id}
            />
          ))}
        </HeaderContainer>
      </div>
    );
  }
}

const msp = (state) => {
  let revised = state.activeCard;
  let card = state.entities.cards[revised];
  let userID = Object.keys(state.entities.users)[0];
  let username = state.entities.users[userID].username;
  let lists = state.entities.lists;
  let comments = state.entities.comments;
  return { card, lists, username, comments };
};

const mdp = (dispatch) => ({
  editCard: (card) => dispatch(editCard(card)),
  closeModal: () => dispatch(closeModal()),
  createComment: (comment) => dispatch(createComment(comment)),
  editComment: (comment) => dispatch(editComment(comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
});

export default connect(msp, mdp)(ShowCardForm);
