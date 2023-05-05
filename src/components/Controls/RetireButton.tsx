import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconRetire } from "@neverquest/icons/retire.svg";
import { isWilderness } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

// TODO
export function RetireButton({ isDisabled }: { isDisabled: boolean }) {
  const isWildernessValue = useRecoilValue(isWilderness);

  const handleRetirement = () => {
    // TODO
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Retire</Tooltip>} placement="top" trigger={[]}>
        <span
          className={`d-inline-block ${getAnimationClass({
            type: "bounceIn",
          })}`}
        >
          <Button
            className="invisible"
            disabled={isWildernessValue || isDisabled}
            onClick={handleRetirement}
            variant="outline-dark"
          >
            <IconImage Icon={IconRetire} />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
