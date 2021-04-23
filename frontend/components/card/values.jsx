import React, { useState } from "react";
import { Card } from "styled-icons/boxicons-solid";

const CalendarValue = (props) => {
  console.log(props);
  console.log(JSON.parse(props.children).values.date);

  const handleSubmit = () => {
    console.log(JSON.parse(props.children).values.date);

    const editedCard = {
      id: props.card.id,
      due_date: JSON.parse(props.children).values.date,
    };

    props.editCard(editedCard);
  };

  return (
    <button type="submit" onClick={() => handleSubmit()}>
      Submit
    </button>
  );
};

export default CalendarValue;
