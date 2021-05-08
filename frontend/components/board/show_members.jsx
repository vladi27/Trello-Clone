import { connect } from "react-redux";
import React, { useState } from "react";
import CommentInitials from "../card/initials";
import styled from "styled-components";
import uniqBy from "lodash/uniqBy";
const PopOver = styled.div`
  top: 15%;
  left: 50%;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  overflow: hidden;
  position: absolute;
  right: -9999px;
  width: 304px;
  z-index: 70;
  -webkit-transform: translateZ(0);
`;

const PopOverHeader = styled.div`
  height: 40px;
  position: relative;
  margin-bottom: 8px;
  text-align: center;
`;

const Title = styled.span`
  box-sizing: border-box;
  color: #5e6c84;
  display: block;
  line-height: 40px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  margin: 0 12px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;

const PopOverContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 12px 12px;
  max-height: 893px;
`;

const BoardMembers = styled.div`
  margin-top: 12px;
`;

const BoardMembersTitle = styled.h4`
  color: #5e6c84;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin-top: 16px;
  text-transform: uppercase;
`;

const MembersList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MemberLink = styled.div`
  border-radius: 3px;
  //   height: 32px;
  line-height: 32px;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
  padding: 4px;
  margin-bottom: 2px;
`;

const FullName = styled.span`
  line-height: 32px;
  white-space: nowrap;
`;

const InitialContainer = styled.span`
  margin-right: 8px;
`;

const Member = (props) => {
  const username = props.member.username;
  const email = props.member.email;
  const initial = username[0].toUpperCase();
  return (
    <MemberLink>
      <InitialContainer>
        <CommentInitials username={initial}></CommentInitials>
      </InitialContainer>
      <FullName>
        {username}({email})
      </FullName>
    </MemberLink>
  );
};

class MembersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const members = this.props.members;
    return (
      <PopOver>
        <PopOverHeader>
          <Title>Members</Title>
        </PopOverHeader>
        <PopOverContent>
          <BoardMembers>
            <BoardMembersTitle>Board Members</BoardMembersTitle>
            <MembersList>
              {" "}
              {members.map((member, idx) => {
                return (
                  <li key={idx} style={{ listStyle: "none" }}>
                    <Member member={member}></Member>
                  </li>
                );
              })}
            </MembersList>
          </BoardMembers>
        </PopOverContent>
      </PopOver>
    );
  }
}

const msp = (state) => {
  let activeBoard = state.activeBoard;

  let board = state.entities.boards[activeBoard];

  const owner = {};
  owner["username"] = board.username;
  owner["email"] = board.email;
  const members = board.members.slice();
  members.push(owner);
  const uniqMembers = uniqBy(members, "email");
  return { members: uniqMembers };
};

const mdp = (dispatch) => ({});

export default connect(msp, mdp)(MembersContainer);
