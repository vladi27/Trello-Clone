import { connect } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import { logout } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

const UsernameContainer = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  color: #5e6c84;
  display: block;
  height: 40px;
  line-height: 40px;
  margin-bottom: 8px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

const Border = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
`;

const LinkCont = styled.div`
  cursor: pointer;
  width: 100%;
`;

const Links = styled.p`
  padding: 6px 12px;
  ${LinkCont}:hover & {
    background: rgba(0, 0, 0, 0.18);
  }
`;

const LinksContainer = styled.div`
  box-sizing: border-box;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

class NavMenuModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <UsernameContainer>{this.props.username}</UsernameContainer>
        <LinksContainer>
          <LinkCont>
            <Links onClick={this.props.logout}>Log Out</Links>
          </LinkCont>
        </LinksContainer>
        <Border></Border>
      </div>
    );
  }
}

const msp = (state) => ({
  username: Object.values(state.entities.users)[0].username,
});

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(msp, mdp)(NavMenuModal);
