import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HomeAlt } from "styled-icons/boxicons-regular/HomeAlt";
import { LogOut } from "styled-icons/boxicons-regular/LogOut";
import { Plus } from "styled-icons/boxicons-regular/Plus";
import AvatarContainer from "./avatar_container";

const NavContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  min-height: 50px;
  justify-content: space-between
  overflow: hidden;
  padding: 4px;
  z-index: 10;
  height: 32px;
  position: relative;
  background: #026aa7;
`;

const PlusIcon = styled(Plus)`
  color: #fff;
  font-size: 20px;
  height: 30px;
  padding: 2px
  line-height: 30px;
  width: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  ${MenuLink}:hover & {
  background: rgba(0, 0, 0, 0.18);
}
`;

const MenuLink = styled.a`
  padding: 0;
  margin-right: 4px;
  border-radius: 3px;
  border: 0;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  text-decoration: none;
  align-items: center;
  background-color: hsla(0, 0%, 100%, 0.3);
  box-shadow: none;
  color: #fff;
  display: flex;
  font-weight: 700;
  height: 32px;
  line-height: 32px;
  margin: 4px 10px 0 2px;
  // padding-left: 2px;
  transition: 0.1s ease;
  white-space: nowrap;
`;

const HomeIcon = styled(HomeAlt)`
  color: #fff;
  font-size: 20px;
  height: 30px;
  padding: 2px
  line-height: 30px;
  width: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  ${MenuLink}:hover & {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const initial = this.props.username.slice(0, 1).toUpperCase();
    return (
      <NavContainer>
        <NavLeft>
          <MenuLink href="#/boards">
            <HomeIcon />
          </MenuLink>
        </NavLeft>
        <div className="center-nav">
          <Link className="center-logo" to={`/`}>
            <i class="fab fa-trello" />
            Yello
          </Link>
        </div>
        <NavRight>
          <MenuLink onClick={this.props.openModal}>
            <PlusIcon></PlusIcon>
          </MenuLink>
          <AvatarContainer
            openMenuModal={this.props.openMenuModal}
            username={initial}
          />
        </NavRight>
      </NavContainer>
    );
  }
}

export default NavBar;
