import React from "react";
import Modal from "react-modal";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "620px",
    width: "580px",
    maxHeight: "94vh",
    background: "var(--theme-ui-colors-background)"
  },
  overlay: {
    zIndex: 2,
    background: "var(--theme-ui-colors-infoBorderLight)",
  }
};

type ModalProps = {
  onDismiss: () => void;
  style?: React.CSSProperties;
};

export const ReactModal: React.FC<ModalProps> = ({ children, onDismiss, style }) => {
  const handleDismiss = () => onDismiss();

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleDismiss}
      style={{ ...modalStyle, content: { ...modalStyle.content, ...style } }}
    >
      {children}
    </Modal>
  );
};
