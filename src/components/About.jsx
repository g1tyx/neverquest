import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QuestionSquare } from "react-bootstrap-icons";

export default function About() {
  const [isShowing, setShowing] = useState(false);

  const handleShow = (state) => setShowing(state);

  return (
    <span>
      <QuestionSquare
        style={{ cursor: "pointer" }}
        onClick={() => handleShow(true)}
      />

      <Modal show={isShowing} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>???</Modal.Body>
      </Modal>
    </span>
  );
}
