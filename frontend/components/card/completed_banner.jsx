import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
const moment = require("moment");

const CardDueDate = styled.div`
  display: block;
  float: left;
  margin: 0 8px 8px 0;
  max-width: 100%;
`;

const Title = styled.div`
  color: #5e6c84;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-top: 16px;
  text-transform: uppercase;
  display: block;
  line-height: 20px;
  margin: 0 8px 4px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 8px 8px 0;
  background: ${(props) => (props.completed ? "green" : "red")};
`;

const StyledCheckbox = styled(Checkbox)`
  position: relative;
  border-radius: 2px;
  height: 16px;
  width: 16px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  background-color: #fafbfc;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  margin: auto 4px auto 0;
`;

const DueDateButton = styled.button`
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  margin-bottom: 0;
`;

class CompletedBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.card.completed,
    };
  }
  handleChange(e) {
    e.preventDefault();
    console.log(e.target.checked);
    let currentState = e.target.checked;

    const newCard = Object.assign(
      {},
      {
        completed: currentState,
        id: this.props.card.id,
      }
    );

    this.props.editCard(newCard).then(this.setState({ checked: currentState }));
  }
  render() {
    const dueDateUTC = this.props.card["due_date"];
    const localDate = moment(dueDateUTC).local().format("YYYY-MM-DD hh:mm A");
    console.log(localDate);
    const { checked } = this.state;

    return (
      <CardDueDate>
        <Title>Due Date</Title>
        <Badge completed={this.props.card.completed}>
          <StyledCheckbox
            checked={this.props.card.completed}
            color="black"
            onChange={this.handleChange.bind(this)}
          ></StyledCheckbox>
          <DueDateButton>{localDate}</DueDateButton>
        </Badge>
      </CardDueDate>
    );
  }
}

export default CompletedBanner;
