import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { experience } from "state/character";

import experienceIcon from "icons/barbed-sun.svg";

export default function Experience() {
  const experienceValue = useRecoilValue(experience);

  return (
    <WithIcon alt="Experience" icon={experienceIcon}>
      {experienceValue}
    </WithIcon>
  );
}
