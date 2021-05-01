import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "styled-icons/boxicons-solid";

const SubmitButton = styled.button`
  cursor: pointer;
  background: white;
  border-radius: 4px;
`;

const CalendarValue = (props) => {
  console.log(props);
  console.log(JSON.parse(props.children).values.date);

  const handleSubmit = () => {
    console.log(JSON.parse(props.children).values.date);

    const editedCard = {
      id: props.card.id,
      due_date: JSON.parse(props.children).values.date,
      completed: false,
    };

    props.editCard(editedCard);
  };

  return (
    <SubmitButton type="submit" onClick={() => handleSubmit()}>
      Schedule Due Date
    </SubmitButton>
  );
};

export default CalendarValue;
