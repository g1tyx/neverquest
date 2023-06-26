import { Nav, Stack, Tab } from "react-bootstrap";

import { ArmorOptions } from "@neverquest/components/Caravan/Blacksmith/ArmorOptions";
import { ShieldOptions } from "@neverquest/components/Caravan/Blacksmith/ShieldOptions";
import { WeaponOptions } from "@neverquest/components/Caravan/Blacksmith/WeaponOptions";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";

const DATA_TABS = [
  {
    Component: WeaponOptions,
    Icon: IconWeapon,
    key: "weapon",
    label: "Weapon",
  },
  {
    Component: ArmorOptions,
    Icon: IconArmor,
    key: "armor",
    label: "Armor",
  },
  {
    Component: ShieldOptions,
    Icon: IconShield,
    key: "shield",
    label: "Shield",
  },
];

export function Blacksmith() {
  return (
    <Stack gap={3}>
      <h6>Craft gear</h6>

      <Tab.Container defaultActiveKey="weapon">
        <Nav justify variant="pills">
          {DATA_TABS.map(({ Icon, key, label }) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={key}>
                <IconImage Icon={Icon} />
                &nbsp;{label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          {DATA_TABS.map(({ Component, key }) => (
            <Tab.Pane eventKey={key} key={key}>
              <Stack gap={3}>
                <hr />

                <Stack className="mx-auto w-50" gap={3}>
                  <Component />
                </Stack>
              </Stack>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Stack>
  );
}
