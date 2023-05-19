import { Button, Modal } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconWarning } from "@neverquest/icons/warning.svg";

export function ConfirmationDialog({
  confirmationLabel,
  message,
  onConfirm,
  setHide,
  show,
  title,
}: {
  confirmationLabel: string;
  message: string;
  onConfirm: () => void;
  setHide: () => void;
  show: boolean;
  title: string;
}) {
  const handleConfirmation = () => {
    onConfirm();
    setHide();
  };

  return (
    <Modal backdrop="static" onHide={setHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconImage Icon={IconWarning} />
          &nbsp;{title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleConfirmation} variant="outline-dark">
          {confirmationLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
