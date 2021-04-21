import React, { useState } from "react";
import styled from "styled-components";

const ActionComment = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  box-sizing: border-box;
  clear: both;
  display: inline-block;
  margin: 4px 2px 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
const CurrentComment = styled.div`
  padding: 8px 12px;
`;

const CommentText = styled.div``;

class TrelloComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = this.props.comment.body;
    return (
      <div>
        <ActionComment>
          <CurrentComment>
            <CommentText>{body}</CommentText>
          </CurrentComment>
        </ActionComment>
        ;
      </div>
    );
  }
}

export default TrelloComment;
