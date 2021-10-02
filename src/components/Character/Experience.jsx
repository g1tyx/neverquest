import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { experience } from "state/character";

import icon from "icons/barbed-sun.svg";

export default function Experience() {
  const experienceValue = useRecoilValue(experience);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Experience" />

      <span>{experienceValue}</span>
    </div>
  );
}
