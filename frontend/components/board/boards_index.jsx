import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CreateNewBoardContainer from "./create_new_board_container";
import NavBarContainer from "../nav_bar/nav_bar_container";
import BoardIndexItem from "./board_index_item";
import { Clock } from "styled-icons/fa-regular/Clock";
import { User } from "styled-icons/boxicons-regular/User";
import { UserShared } from "styled-icons/remix-line/UserShared";
import merge from "lodash/merge";

const HomeWrapper = styled.div`
  // display: flex;
  // align-items: center;
  // padding-left: 64px;
  // justify-content: center;
  // flex-direction: column;
  // box-sizing: border-box;
  // // min-height: calc(100vh - 40px);

  width: 860px;
  flex: 1 1 100%;
  // min-width: 352px;
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
  // padding: 0 0 20px;

  //top: 15px;
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
  // position: absolute;

  //top: 15px;
`;

const RecentTitleContainer = styled.div`
  margin: 0 0 0 40px;
  padding: 8px 0 11px;
  position: relative;
  display: flex;
`;
const AllBoards = styled.div`
  // padding-left: 20px;
  // padding-right: 20px;
  // margin-top: 40px;
  // margin-left: 200px;
  // margin-right: 200px;
  flex: 1 1 100%;
  height: 50%;
  // margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  min-width: 352px;
  // padding-left: 20px;
  padding-right: 20px;
  // padding-left: 64px;

  // width: 0;
  // flex: 1 1 100%;
  // min-width: 352px;
  // display: flex;
  // padding-left: 20px;
  // padding-right: 20px;
  // margin-top: 40px;
  // flex-direction: row;
  // flex-wrap: wrap;
  // overflow-y: auto;
  // outline: none;
  // flex-grow: 1;
  // margin: 0 auto;
  // max-width: 1250px;
  // padding: 0 0 20px;
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
    let boards;
    console.log(this.props);
    if (type === "owned") {
      boards = this.props.boards.filter((board) => {
        if (!("shared_board" in board)) {
          return board;
        }
      });
    } else {
      boards = this.props.boards.filter((board) => {
        if ("shared_board" in board) {
          return board;
        }
      });
    }

    if (boards.length === 0) {
      return;
    }

    return boards.map((board) => {
      return (
        <BoardIndexItem
          board={board}
          key={board.id}
          recentBoards={this.state.recentBoards}
          updateMostRecentBoards={this.props.updateMostRecentBoards}
          user={this.props.user}
          update={this.props.update}
        />
      );
    });
  }

  renderMostActiveBoards() {
    const recents = this.state.recentBoards.filter(
      (ele) => ele !== "undefined"
    );
    const allBoards = this.props.allBoards;

    console.log(allBoards);
    console.log(recents);

    if (Object.values(allBoards).length < recents.length) {
      return <p>Loading...</p>;
    }
    return recents.map((id, idx) => {
      let board = allBoards[id];
      console.log(board);
      return <BoardIndexItem board={board} key={idx} />;
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

//   updateRecentBoards(board) {
//     if (this.state.recentBoardsIds.slice(-4).indexOf(board.id) === -1) {
//       this.setState({ recentBoards: [...this.state.recentBoards, board] });
//       this.setState({
//         recentBoardsIds: [...this.state.recentBoardsIds, board.id]
//       });
//     }
//   }

//   render() {
//     const allBoards = this.props.boards.map(board => (
//       <li className="boards-list-item">
//         <Link
//           className="board-tile"
//           key={board.id}
//           onClick={() => this.updateRecentBoards(board)}
//           to={`/boards/${board.id}`}
//         >
//           <span className="board-tile-fade" />
//           <div className="board-tile-details">
//             <div className="board-tile-details-name">{board.title}</div>
//           </div>
//         </Link>
//       </li>
//     ));
//     const recentBoards = this.state.recentBoards.slice(-4).map((board, i) => (
//       <li className="boards-list-item">
//         <Link className="board-tile" key={board.id} to={`/boards/${board.id}`}>
//           <span className="board-tile-fade" />
//           <div className="board-tile-details">
//             <div className="board-tile-details-name">{board.title}</div>
//           </div>
//         </Link>
//       </li>
//     ));
//     return (
//       <div>
//         <NavBarContainer />

//         <div id="content">
//           <div className="member-boards-view">
//             <div className="home-sticky-container">
//               <div style={{ position: "sticky", top: 0 + "px" }}>
//                 <nav className="home-left-sidebar-container" />
//               </div>
//               <div className="all-boards">
//                 <div style={{ position: "sticky", top: 0 + "px" }}>
//                   <div className="content-all_boards">
//                     <div>
//                       <div className="boards-page-board-section">
//                         <div className="recently-viewed-container">
//                           <div className="recently-viwed-icon">
//                             <span className="icon-clock">
//                               <i className="far fa-clock" />
//                             </span>
//                           </div>
//                           <h3 className="recently-viewed-title">
//                             Recently Viewed
//                           </h3>
//                         </div>
//                         <ul className="boards-page-board-section-list">
//                           {recentBoards}
//                         </ul>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="boards-page-board-section">
//                         <div className="recently-viewed-container">
//                           <div className="recently-viwed-icon">
//                             <span className="icon-clock">
//                               <i className="far fa-user" />
//                             </span>
//                           </div>
//                           <h3 className="recently-viewed-title">
//                             Personal Boards
//                           </h3>
//                         </div>
//                         <ul className="boards-page-board-section-list">
//                           {allBoards}
//                           {this.props.createNewBoard}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
