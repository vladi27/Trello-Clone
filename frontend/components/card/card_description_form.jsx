import React, { useState } from "react";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import { editCard } from "../../actions/cards_actions";
import TrelloButton from "../trello_button";
import { MenuAltLeft } from "styled-icons/boxicons-regular/MenuAltLeft";

const StyledTextArea = styled(Textarea)`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 50px;
  min-height: 50px;
  background: #fff;
  box-shadow: none;
  border-color: rgba(9, 30, 66, 0.13);
  margin-bottom: 4px;
  margin-right: 10px
  padding: 0 5px
  width: 100%;
`;

const MenuIcon = styled(MenuAltLeft)`
  top: 8px;
  left: -40px;
  position: absolute;
  top: 2px;
  color: #42526e;
  height: 32px;
  line-height: 30px;
  width: 30px;
  font-size: 24px;
`;

const FormWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  clear: both;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
`;

const HeaderTitle = styled.h3`
  display: inline-block;
  width: auto;
  margin: 0;
  min-height: 18px;
  min-width: 40px;
  font-size: 16px;
  line-height: 20px;
  margin-right: 4px;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  font-family: Helvetica Neue, sans-serif;
`;

const CardDescription = styled.p`
  margin: 0 0 8px;
  line-height: 20px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
`;

const CardContainer = styled.div`
  cursor: pointer;
`;

const TextContainer = styled.div`
  margin-bottom: 0;
  padding-bottom: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin: 0 0 8px;
  cursor: pointer;
`;
const BorderFormContainer = styled.div`
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  display: block;
  min-height: 40px;
  padding: 8px 12px;
  text-decoration: none;
  transition: background 0.1s ease-in;
  ${TextContainer}:hover & {
    background: #ccc;
  }
`;
const BodyForm = styled.div`
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  min-height: 40px;
  // padding: 8px 12px;
  text-decoration: none;
`;

const DescriptionComponent = () => {};

class CardDescriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: this.props.card.body, isEditing: false };
    this.handleFinishEditing = this.handleFinishEditing.bind(this);
  }

  handleCloseForm(e) {
    // e.preventDefault();
    this.setState({ isEditing: false, description: this.props.card.body });
  }
  moveCaretAtEnd(e) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  handleFocus(e) {
    let val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ description: e.currentTarget.value });
  }

  handleFinishEditing(e) {
    e.preventDefault();
    const newCard = Object.assign(
      {},
      {
        body: this.state.description,
        id: this.props.card.id,
      }
    );
    this.props.editCard(newCard).then(this.setState({ isEditing: false }));
  }

  renderEditInput() {
    const placeholder = "Add more detailed description...";
    const text = this.state.description;

    return (
      <div>
        <StyledTextArea
          // style={{ marginBottom: "4px" }}
          placeholder={placeholder}
          autoFocus
          value={text}
          onFocus={this.handleFocus}
          // onFocus={this.moveCaretAtEnd.bind(this)}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleCloseForm.bind(this)}
        />
        <TrelloButton onClick={this.handleFinishEditing.bind(this)}>
          Save
        </TrelloButton>
      </div>
    );
  }

  render() {
    const description = this.props.card.body;
    const { isEditing } = this.state;
    let descriptionRender;
    if (description) {
      descriptionRender = (
        <div>
          <CardContainer
            dir="auto"
            onClick={() => this.setState({ isEditing: true })}
          >
            <CardDescription dir="auto">{description}</CardDescription>
          </CardContainer>
        </div>
      );
    } else {
      descriptionRender = (
        <div>
          <TextContainer>
            <BorderFormContainer
              onClick={() => this.setState({ isEditing: true })}
            >
              <BodyForm>Add a more detailed description...</BodyForm>
            </BorderFormContainer>
          </TextContainer>
        </div>
      );
    }

    return (
      <FormWrapper>
        <HeaderContainer>
          <MenuIcon />
          <HeaderTitle>Description</HeaderTitle>
        </HeaderContainer>
        <div>{isEditing ? this.renderEditInput() : descriptionRender}</div>
      </FormWrapper>
    );

    // if (description) {
    //   return (
    //     <FormWrapper>
    //       <HeaderContainer>
    //         <MenuIcon />
    //         <HeaderTitle>Description</HeaderTitle>
    //       </HeaderContainer>
    //       <div>
    //         {isEditing ? (
    //           this.renderEditInput()
    //         ) : (
    //           <CardContainer
    //             dir="auto"
    //             onClick={() => this.setState({ isEditing: true })}
    //           >
    //             <CardDescription dir="auto">{description}</CardDescription>
    //           </CardContainer>
    //         )}
    //       </div>
    //     </FormWrapper>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <FormWrapper>
    //         <HeaderContainer>
    //           <MenuIcon />
    //           <HeaderTitle>Description</HeaderTitle>
    //         </HeaderContainer>

    //         {isEditing ? (
    //           this.renderEditInput()
    //         ) : (
    //           <TextContainer>
    //             <BorderFormContainer
    //               onClick={() => this.setState({ isEditing: true })}
    //             >
    //               <BodyForm>Add a more detailed description...</BodyForm>
    //             </BorderFormContainer>
    //           </TextContainer>
    //         )}
    //       </FormWrapper>
    //     </div>
    //   );
    // }
  }
}

export default CardDescriptionForm;
