import { connect } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import { editCard } from "../../actions/cards_actions";
import {
  createComment,
  deleteComment,
  editComment,
} from "../../actions/comments_actions";
import CardDescriptionForm from "./card_description_form";
import CommentInitials from "./initials";
import TrelloCalendar from "./calendar";
import CompletedBanner from "./completed_banner";
import CommentForm from "../comment/comment_form";
import TrelloComment from "../comment/trello_comment";
import { Close } from "styled-icons/material/Close";
import { closeModal } from "../../actions/modal_actions";
import { CreditCard } from "styled-icons/boxicons-regular/CreditCard";
import MomentUtils from "@date-io/moment";
import { Clock } from "styled-icons/fa-regular/Clock";
import Checkbox from "@material-ui/core/Checkbox";
const moment = require("moment");

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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

const FakeFocus = styled.a``;

const TitleContainer = styled.div`
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   cursor: pointer;

  // margin: 12px 40px 8px 56px;
  min-height: 32px;
  padding: 8px 0 0;
  //   //cursor: pointer;

  margin: 4px 0 0;
  //   padding: 8px 0 0;
`;

const StyledInput = styled.input`
  width: 70%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  //   margin-bottom: 3px;
  // padding: 5px;
  background: #fff;
  //   border-radius: 3px;
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

const MemberInitials = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 700;
  height: 32px;
  left: 0;
  line-height: 32px;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
`;

const WindowSideBar = styled.div`
  float: right;
  padding: 0 16px 8px 8px;
  width: 168px;
  overflow: hidden;
  z-index: 11;
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 50px;
`;

const WindowModule = styled.div`
  clear: both;
  // margin-bottom: 24px;
  position: relative;
`;

const DueButton = styled.a`
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 32px;
  margin-top: 8px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  // transition-property: background-color, border-color, box-shadow;
  // transition-duration: 85ms;
  // transition-timing-function: ease;
`;

const ClockIcon = styled(Clock)`
  // color: rgb(66, 82, 110);

  // fill: inherit;
  // flex-shrink: 0;
  // line-height: 1;
  margin-right: 8px;
  margin-left: -4px;
  // line-height: 1;
  height: 15px;
  width: 20px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  cursor: pointer;
  width: auto
  height: 100%;
`;

const DueDate = styled.span`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;
class ShowCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.card.title,
      isEditing: false,
      showCalendar: false,
    };
    this.handleFinishEditing = this.handleFinishEditing.bind(this);
  }

  handleCloseForm(e) {
    // e.preventDefault();
    this.setState({ isEditing: false });
  }

  handleFocus(e) {
    e.target.select();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ title: e.currentTarget.value });
  }
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
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
    //   .then((this.props.title = this.state.title));
  }

  sortComments(dateArray) {
    console.log(dateArray);
    let sorted = dateArray.sort((a, b) => this.desc(a, b));
    console.log(sorted);
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
      height: "32px",
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
            if (e.charCode == 13) {
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
    const { showCalendar } = this.state;
    const comments = Object.values(this.props.comments).filter((comment) => {
      let cardId = this.props.card.id;
      if (cardId === comment.card_id) {
        return comment;
      }
    });
    const sortedComments = this.sortComments(comments);

    const initial = this.props.username.slice(0, 2).toUpperCase();
    const dueDateUTC = this.props.card["due_date"];
    console.log(dueDateUTC);
    if (dueDateUTC) {
      var localDate = moment(dueDateUTC).local().format("YYYY-MM-DD hh:mm A");
    }
    console.log(localDate);

    return (
      <div>
        <CloseButton onClick={this.props.closeModal} />
        <div>
          {/* <h2>Due Date</h2> */}
          <TrelloCalendar
            card={this.props.card}
            editCard={this.props.editCard}
          />
          {/* <WindowSideBar>
            <WindowModule>
              <h3>Add to Card</h3>
              <InputContainer>
                <TrelloCalendar
                  card={this.props.card}
                  editCard={this.props.editCard}
                />
              </InputContainer> */}

          {/* {!showCalendar ? (
                <InputContainer
                  onClick={() => this.setState({ showCalendar: true })}
                >
                  <DueButton>
                    <ClockIcon></ClockIcon>
                    <DueDate>Due Date</DueDate>
                  </DueButton>
                </InputContainer>
              ) : (
                <TrelloCalendar
                  card={this.props.card}
                  editCard={this.props.editCard}
                />
              )} */}
          {/* </WindowModule>
          </WindowSideBar> */}
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
          {sortedComments.map((comment, index) => (
            <TrelloComment
              comment={comment}
              deleteComment={this.props.deleteComment}
              editComment={this.props.editComment}
              key={index}
            />
          ))}
        </HeaderContainer>
        {/* <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker />
          <TimePicker />
          <DateTimePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider> */}
      </div>
    );
  }
}

const msp = (state) => {
  let revised = state.activeCard;
  //console.log(revised);
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

// console.log(this.props);
// const { title } = this.props;
// if (this.state.isEditing === false) {
//     return (
//         <div>
//             <ModalWrapper>
//                 <HeaderContainer>
//                     <TitleContainer>
//                         <CardTitle onClick={() => this.setState({ isEditing: true })}>
//                             {title}
//                         </CardTitle>
//                     </TitleContainer>
//                     <ListReference>{`list ${this.props.list_id}`}</ListReference>
//                 </HeaderContainer>
//             </ModalWrapper>
//         </div>
//     );
// } else {
//     return (
//         <ModalWrapper>
//             <HeaderContainer>
//                 <TitleContainer>{this.renderEditInput()}</TitleContainer>
//             </HeaderContainer>
//         </ModalWrapper>
//     );
// }
//   }
