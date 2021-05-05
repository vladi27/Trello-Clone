import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import CreateNewBoardContainer from "../board/create_new_board_container";
import InviteFormContainer from "../board/invite_form_container";
import MembersContainer from "../board/show_members";
import ShowCardFormContainer from "../card/show_card_form_container";
import NavMenuContainer from "../nav_bar/nav_menu_container";
function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "create new board":
      component = <CreateNewBoardContainer />;
      return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={(e) => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case "show card form":
      component = <ShowCardFormContainer />;

      return (
        <div className="window-overlay" onClick={closeModal}>
          <div className="window-child" onClick={(e) => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case "open invite form":
      component = <InviteFormContainer />;
      return (
        <div className="window-overlay" onClick={closeModal}>
          <div className="modal-child" onClick={(e) => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case "open members list":
      component = <MembersContainer />;
      return (
        <div className="window-overlay" onClick={closeModal}>
          <div className="modal-child" onClick={(e) => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case "show nav menu":
      component = <NavMenuContainer />;

      return (
        <div className="nav-modal-background" onClick={closeModal}>
          <div className="nav-modal" onClick={(e) => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

// function Modal({ modal, closeModal }) {
//   if (!modal) {
//     return null;
//   }
//   let component;
//   switch (modal) {
//     case "create new board":
//       component = <CreateNewBoardContainer />;
//       break;
//   }
//   return (
//     <div className="modal-background" onClick={closeModal}>
//       <div className="modal-child" onClick={e => e.stopPropagation()}>
//         {component}
//       </div>
//     </div>
//   );
// }
