import React from "react";
import styled from "styled-components";
import NavBarContainer from "../../nav_bar/nav_bar_container";
import BoardIndexItem from "./board_index_item";
import { Clock } from "styled-icons/fa-regular/Clock";
import { User } from "styled-icons/boxicons-regular/User";
import { UserShared } from "styled-icons/remix-line/UserShared";

const HomeWrapper = styled.div`
  width: 860px;
  flex: 1 1 100%;
  padding-left: 400px;
  padding-right: 20px;
  margin-top: 40px;
  position: relative
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const ClockIcon = styled(Clock)`
  left: -40px;
  position: absolute;
  top: 5px;
  height: 30px;
  line-height: 32px;
  width: 30px;
  color: #42526e;
`;

const UserIcon = styled(User)`
  left: -40px;
  position: absolute;
  top: 5px;
  height: 30px;
  line-height: 32px;
  width: 30px;
  color: #42526e;
`;
const SharedIcon = styled(UserShared)`
  left: -40px;
  position: absolute;
  top: 5px;
  height: 30px;
  line-height: 32px;
  width: 30px;
  color: #42526e;
`;

const RecentViewsContainer = styled.div`
  margin: 10px auto;
  max-width: 1250px;
  padding-left: 90px;
  position: relative;
  font-size: 16px;
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 700;
`;

const AllWraper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 0;
  // overflow: hidden;
`;

const AllBoardsContainer = styled.div`
  margin: 10px auto;
  max-width: 1250px;
  padding: 0 0 20px;
  padding-left: 90px;
  font-size: 16px;
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 700;
`;

const RecentTitleContainer = styled.div`
  margin: 0 0 0 40px;
  padding: 8px 0 11px;
  position: relative;
  display: flex;
`;
const AllBoards = styled.div`
  flex: 1 1 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  min-width: 352px;
  padding-right: 20px;
`;

class BoardsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recentBoards: this.props.recentActiveBoards || [] };
  }

  componentDidMount() {
    this.props.fetchAllBoards();
  }

  renderBoards(type) {
    let boards =
      type === "shared" ? this.props.sharedBoards : this.props.ownedBoards;

    if (boards.length === 0) {
      return;
    }

    return boards.map((board, idx) => {
      return (
        <BoardIndexItem
          board={board}
          key={board.id}
          recentBoards={this.state.recentBoards}
          updateMostRecentBoards={this.props.updateMostRecentBoards}
          user={this.props.user}
          update={this.props.update}
          key={idx}
        />
      );
    });
  }

  renderMostActiveBoards() {
    const recents = this.state.recentBoards.filter(
      (ele) => ele !== "undefined"
    );

    const allBoards = this.props.allBoards;

    if (Object.values(allBoards).length < recents.length) {
      return <p>Loading...</p>;
    }
    return recents.map((id, idx) => {
      let board = allBoards[id];
      if (board) {
        return <BoardIndexItem board={board} key={idx} />;
      }
    });
  }

  render() {
    return (
      <AllWraper>
        <NavBarContainer />
        <HomeWrapper>
          <RecentViewsContainer>
            <RecentTitleContainer>
              <h3>Recently Viewed</h3>
              <ClockIcon />
            </RecentTitleContainer>
            <AllBoards>{this.renderMostActiveBoards()}</AllBoards>
          </RecentViewsContainer>
          <AllBoardsContainer>
            <RecentTitleContainer>
              <h3>My Boards</h3>
              <UserIcon />
            </RecentTitleContainer>
            <AllBoards>
              {this.renderBoards("owned")}
              {this.props.createNewBoard}
            </AllBoards>
            <RecentTitleContainer>
              <h3>Shared Boards</h3>
              <SharedIcon />
            </RecentTitleContainer>
            <AllBoards>{this.renderBoards("shared")}</AllBoards>
          </AllBoardsContainer>
        </HomeWrapper>
      </AllWraper>
    );
  }
}

export default BoardsIndex;
