import React from "react";
import { Button, Modal } from "rsuite";

function ModalWrap({ open, handleClose, children, title, showFooter = true }) {
  return (
    <div className="modal-container">
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        )}{" "}
      </Modal>
    </div>
  );
}

export default ModalWrap;
