import Offcanvas from "react-bootstrap/Offcanvas";

export default function DismissableScreen({
  content,
  isShowing,
  onClose,
  placement = "end",
  title,
}) {
  return (
    <Offcanvas
      onHide={onClose}
      placement={placement}
      show={isShowing}
      style={{ minWidth: 450, width: "33%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{content}</Offcanvas.Body>
    </Offcanvas>
  );
}
