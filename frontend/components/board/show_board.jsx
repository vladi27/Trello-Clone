import React from "react";
import NavBarContainer from "../nav_bar/nav_bar_container";
import { connect } from "react-redux";
import {
  fetchBoard,
  setActiveBoard,
  updateBoard,
  deleteBoard,
  updateMostRecentBoards,
} from "../../actions/board_actions";
import { update } from "../../actions/session_actions";
import { fetchAllLists } from "../../actions/lists_actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloList from "../list/trello_list";
import styled from "styled-components";
import TrelloCreate from "../trello_create";
import { sort } from "../../actions/lists_actions";
import { Delete } from "styled-icons/feather/Delete";
import { openModal } from "../../actions/modal_actions";

const Content = styled.div`
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  outline: none;
  height: 100%;
  background: #2d90cb;
  z-index: 2;
`;

const PageWrapper = styled.div`
  height: 100%;
  position: absolute;
  // overflow-y: auto;
  width: 100%;
  z-index: 0;
  // background: #2d90cb;
  overflow: hidden;
`;

const BoardWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 20px;
  top: 60px;
  bottom: 0;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50px;
`;

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  position: relative;
  transition: margin 0.1s ease-in;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  margin-left: 10px;
`;

const BoardHeader = styled.div`
  height: auto;
  position: relative;
  background: transparent;
  display: flex;
  justify-content: start
  padding: 12px 4px 4px 8px;
  bottom: 10px;
  transition: padding 0.1s ease -in 0s;

`;

const BoardTitle = styled.div`
  background: transparent;
  margin-right: 2px
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  padding: 0;
  text-decoration: none;
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 3px;
  color: #fff;

  position: relative;
`;

const BoardTitleForm = styled.span`
  padding: 0 12px;
  cursor: default;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  line-height: 32px;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  ${BoardTitle}:hover & {
    background: rgba(0, 0, 0, 0.18);
  }
`;

const StyledInput = styled.input`
  background: white;
  cursor: default;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  height:90%
  padding: 0 10px;
  height:auto
  border: 0;
  width: 200px;
  text-decoration: none;
  // max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: inset 0 0 0 2px #0079bf
`;

const MenuLink = styled.a`
  // color: rgb(255, 255, 255);
  cursor: pointer;
  float: left;
  margin-left: 30px;
  color: #172b4d;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  padding-left: 32px;
  position: relative;
  border-radius: 3px;
  margin: 0px 4px 4px 0px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.08);
  text-decoration: none;
`;

const DeleteIcon = styled(Delete)`
  background-clip: content-box;
  background-origin: content-box;
  color: rgb(255, 255, 255);
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 6px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  width: 20px;
  ${MenuLink}:hover & {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const InviteContainer = styled.a`
  background-color: rgba(0, 0, 0, 0.08);
  padding-left: 12px;
  margin-left: 30px;
  border-radius: 3px;
  color: #fff;
  height:32px
  float: left;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  max-width: 400px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
`;

const InviteButton = styled.span`
  padding-right: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  font-size: 14px;

  font-weight: 400;
  cursor: pointer;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;

  ${InviteContainer}:hover & {
    background: rgba(0, 0, 0, 0.08);
  }
`;

class BoardShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: "",
      email: "",
    };

    this.handleFinishEditing = this.handleFinishEditing.bind(this);
  }

  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.boardId).then((board) => {
      this.setState({
        title: this.props.board.title,
        isEditing: false,
      });
    });
  }

  onDragEnd(result) {
    const { destination, source, draggableId, type } = result;
    const boardID = this.props.match.params.boardId;

    if (!destination) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
      boardID
    );
  }

  getCards(list) {
    let allCards = this.props.cards;
    let cards = list.card_positions.map((position) => {
      allCards[position];
    });

    return cards;
  }

  handleDeleteBoard(e) {
    const boardId = this.props.board.id;
    const receivedUser = this.props.user;
    const userID = Number(Object.keys(receivedUser)[0]);
    this.props
      .deleteBoard(boardId, userID)
      .then(() => this.props.history.push(`/boards/`));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ title: e.currentTarget.value });
  }

  handleCloseForm(e) {
    // e.preventDefault();
    this.setState({ isEditing: false });
  }

  handleFocus(e) {
    let val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  handleFinishEditing(e) {
    e.preventDefault();
    const newBoard = Object.assign(
      {},
      {
        title: this.state.title,
        id: this.props.board.id,
      }
    );
    this.props.updateBoard(newBoard).then(this.setState({ isEditing: false }));
  }

  handleInviteForm(e) {
    e.preventDefault();
    const boardId = this.props.board.id;
    this.props.setActiveBoard(boardId);
    this.props.openInviteForm();
  }
  handleMembersList(e) {
    e.preventDefault();
    const boardId = this.props.board.id;
    this.props.setActiveBoard(boardId);
    this.props.openMembersList();
  }

  renderEditInput() {
    let styles = {
      overflow: "hidden",
      overflowWrap: "break-word",
      height: "32px",
    };
    return (
      <form onSubmit={this.handleFinishEditing}>
        <StyledInput
          style={styles}
          dir="auto"
          type="text"
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
          autoFocus
          onFocus={this.handleFocus}
          onBlur={this.handleCloseForm.bind(this)}
          onKeyDown={(e) => {
            if (e.key == 13) {
              this.handleFinishEditing;
            }
          }}
        />
      </form>
    );
  }

  render() {
    const { board } = this.props;
    if (!board) {
      return <p>Loading</p>;
    }
    const listOrder = board.list_positions || [];

    return (
      <PageWrapper>
        <Content>
          <NavBarContainer />
          <BoardWrapper>
            <StyledWrapper>
              <BoardHeader>
                {this.state.isEditing ? (
                  this.renderEditInput()
                ) : (
                  <BoardTitle
                    dir="auto"
                    onClick={() => this.setState({ isEditing: true })}
                  >
                    <BoardTitleForm dir="auto">{board.title}</BoardTitleForm>
                  </BoardTitle>
                )}{" "}
                <MenuLink>
                  <DeleteIcon
                    onClick={this.handleDeleteBoard.bind(this)}
                  ></DeleteIcon>
                </MenuLink>
                <InviteContainer onClick={this.handleInviteForm.bind(this)}>
                  <InviteButton>Invite</InviteButton>
                </InviteContainer>
                <InviteContainer onClick={this.handleMembersList.bind(this)}>
                  <InviteButton>Members</InviteButton>
                </InviteContainer>
              </BoardHeader>
              <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable
                  droppableId="all-lists"
                  direction="horizontal"
                  type="list"
                >
                  {(provided) => (
                    <ListsContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {listOrder.map((listID, index) => {
                        const list = this.props.lists[listID];
                        if (list) {
                          const cards = list.card_positions.map((pos) => {
                            return this.props.cards[pos];
                          });

                          return (
                            <TrelloList
                              listID={list.id}
                              key={list.id}
                              title={list.title}
                              cardPositions={list.card_positions}
                              cards={cards}
                              index={index}
                              boardId={board.id}
                            />
                          );
                        }
                      })}
                      {provided.placeholder}

                      <TrelloCreate list />
                    </ListsContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </StyledWrapper>
          </BoardWrapper>
        </Content>
      </PageWrapper>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    board: state.entities.boards[ownProps.match.params.boardId],
    recentActiveBoards: Object.values(state.entities.users)[0].recent_boards,
    lists: state.entities.lists,
    cards: state.entities.cards,
    user: state.entities.users,
  };
};

const mdp = (dispatch) => ({
  openInviteForm: () => dispatch(openModal("open invite form")),
  openMembersList: () => dispatch(openModal("open members list")),
  fetchBoard: (id) => dispatch(fetchBoard(id)),
  updateBoard: (board) => dispatch(updateBoard(board)),
  deleteBoard: (boardId, userId) => dispatch(deleteBoard(boardId, userId)),
  fetchAllLists: (id) => dispatch(fetchAllLists(id)),
  update: (user) => dispatch(update(user)),
  setActiveBoard: (id) => dispatch(setActiveBoard(id)),

  updateMostRecentBoards: (recentBoards) =>
    dispatch(updateMostRecentBoards(recentBoards)),
  sort: (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
    boardID
  ) =>
    dispatch(
      sort(
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
        boardID
      )
    ),
});

export default connect(msp, mdp)(BoardShow);
