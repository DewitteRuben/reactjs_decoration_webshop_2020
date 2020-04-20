import React from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import { default as ReactModal } from "react-modal";
import Button from "../Button/Button";
import { Spacer } from "../Layout";
import _ from "lodash";

interface IModalProps {
  title: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

ReactModal.setAppElement("#root");

const customStyles: ReactModal.Styles = {
  overlay: {
    zIndex: 100
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    height: "130px",
    transform: "translate(-50%, -50%)"
  }
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 2;
`;

const ConfirmationModal: React.FC<IModalProps & ReactModal.Props> = ({ title, message, onCancel, onConfirm, ...rest }) => {
  return (
    <ReactModal style={customStyles} {...rest}>
      <ModalContainer>
        <Typography type="title" fontWeight="bold" fontSize="larger">
          {title}
        </Typography>
        <Content>
          <Typography fontSize="large">{message}</Typography>
        </Content>
        <Footer>
          <Button onClick={onCancel}>Cancel</Button>
          <Spacer />
          <Button onClick={onConfirm}>Ok</Button>
        </Footer>
      </ModalContainer>
    </ReactModal>
  );
};

export default ConfirmationModal;
