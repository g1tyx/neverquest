import { useState } from "react";
import {
  Button,
  FormSelect,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconNavigation from "@neverquest/icons/navigation.svg?react";
import { location, stage, wildernesses } from "@neverquest/state/encounter";
import { activeControl } from "@neverquest/state/ui";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CompassNavigate() {
  const locationValue = useRecoilValue(location);
  const [stageValue, setStage] = useRecoilState(stage);
  const wildernessesValue = useRecoilValue(wildernesses);
  const resetActiveControl = useResetRecoilState(activeControl);

  const [isShowingNavigation, setIsShowingNavigation] = useState(false);

  const progressQuest = useProgressQuest();
  const resetWilderness = useResetWilderness();

  const canNavigate = locationValue === "wilderness";

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>The needle is spinning.</span>
          </Tooltip>
        }
        trigger={canNavigate ? [] : POPOVER_TRIGGER}
      >
        <div>
          <Button
            disabled={!canNavigate}
            onClick={() => {
              setIsShowingNavigation(true);
            }}
            variant="outline-dark"
          >
            Navigate
          </Button>
        </div>
      </OverlayTrigger>

      <Modal
        onHide={() => {
          setIsShowingNavigation(false);
        }}
        show={isShowingNavigation}
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconCompass}>
              <span>Navigate the wilderness</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <IconDisplay Icon={IconNavigation} tooltip="Navigation">
            <FormSelect
              disabled={!canNavigate}
              onChange={({ target: { value } }) => {
                progressQuest({ quest: "warpingWilderness" });

                setIsShowingNavigation(false);
                resetActiveControl();

                setStage(Number(value));
                resetWilderness();
              }}
              value={stageValue}
            >
              {wildernessesValue.map((name, index) => {
                const stageIndex = index + 1;

                return (
                  <option key={name} value={stageIndex}>
                    Stage&nbsp;
                    {formatNumber({
                      value: stageIndex,
                    })}
                    &nbsp;
                    {LABEL_SEPARATOR}&nbsp;
                    {name}
                  </option>
                );
              })}
            </FormSelect>
          </IconDisplay>
        </ModalBody>
      </Modal>
    </>
  );
}
