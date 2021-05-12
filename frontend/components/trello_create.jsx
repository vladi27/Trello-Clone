import React from "react";
import Icon from "@material-ui/core/Icon";
import TrelloButton from "./trello_button";
import { connect } from "react-redux";
import { createList } from "../actions/lists_actions";
import { createCard } from "../actions/cards_actions";
import styled from "styled-components";
import TrelloForm from "./trello_form";
import TrelloOpenForm from "./trello_open_form";
import { withRouter } from "react-router-dom";

class TrelloCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      text: "",
    };
    this.openForm = this.openForm.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
  }

  openForm() {
    this.setState({
      formOpen: true,
    });
  }

  closeForm(e) {
    this.setState({
      formOpen: false,
    });
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleAddList() {
    const { dispatch } = this.props;
    const { text } = this.state;
    const boardId = parseInt(this.props.match.params.boardId);

    if (text) {
      this.setState({
        text: "",
      });
      let list = Object.assign(
        {},
        {
          board_id: boardId,
          title: this.state.text,
        }
      );

      dispatch(createList(list));
    }

    return;
  }

  handleAddCard() {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      let card = Object.assign(
        {},
        {
          list_id: listID,
          title: this.state.text,
        }
      );
      dispatch(createCard(card));
    }
    return;
  }

  renderOpenForm() {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  }

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        list={list}
        text={text}
        onChange={this.handleInputChange.bind(this)}
        closeForm={this.closeForm.bind(this)}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

export default withRouter(connect()(TrelloCreate));
