import type { Dispatch, SetStateAction } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Stack,
} from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "../IconDisplay";
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited";
import { ProgressReduction } from "@neverquest/components/Retirement/ProgressReduction";
import { ResetDetails } from "@neverquest/components/Retirement/ResetDetails";
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useRetire } from "@neverquest/hooks/actions/useRetire";
import IconRetire from "@neverquest/icons/retire.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { canUseJournal } from "@neverquest/state/quests";

export function Retirement({
  state: [isShowing, setIsShowing],
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const ownedItemJournal = useRecoilValue(ownedItem("journal"));
  const setCanUseJournal = useSetRecoilState(canUseJournal);

  const progressQuest = useProgressQuest();
  const retire = useRetire();

  const onHide = () => {
    setIsShowing(false);
  };

  return (
    <Modal onHide={onHide} show={isShowing} size="lg">
      <ModalHeader closeButton>
        <ModalTitle>
          <IconDisplay Icon={IconRetire}>
            <span>Retirement</span>
          </IconDisplay>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={5}>
          <span>
            Retiring starts a new quest with reduced monster density per stage. A powerful trait can
            also be chosen, bestowing a permanent boon. Certain items are inherited for the new
            quest.
          </span>

          <ResetDetails />

          <ProgressReduction />

          <ItemsInherited />

          <TraitSelection />
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            onHide();

            if (ownedItemJournal !== undefined) {
              setCanUseJournal(true);
              progressQuest({ quest: "decipheringJournal" });
            }

            retire();
          }}
          variant="outline-dark"
        >
          Retire
        </Button>
      </ModalFooter>
    </Modal>
  );
}
