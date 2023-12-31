import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconDisplay } from "../IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconDiscard from "@neverquest/icons/discard.svg?react";
import { inventory } from "@neverquest/state/inventory";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function DiscardItem({ ID, name }: { ID: string; name: string }) {
  const setInventoryValue = useSetRecoilState(inventory);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Discard</Tooltip>}>
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-dark"
        >
          <IconImage className="small" Icon={IconDiscard} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconDiscard}>
              <span>Discard item?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{`"${capitalizeAll(name)}" will be lost forever.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setInventoryValue((currentInventory) =>
                currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
              );

              onHide();
            }}
            variant="outline-dark"
          >
            Discard
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
