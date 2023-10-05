import { AFFIXES } from "@neverquest/LOCRAN/data/affixes";
import { CREATURES } from "@neverquest/LOCRAN/data/creatures";
import { NAMES } from "@neverquest/LOCRAN/data/names";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function generateName({
  allowNSFW = false,
  hasTitle = false,
}: {
  allowNSFW?: boolean;
  hasTitle?: boolean;
}) {
  const filteredNames = NAMES.filter((current) => {
    const isNSFW = Boolean(current.isNSFW);

    return allowNSFW ? isNSFW || !isNSFW : !isNSFW;
  });
  const prefixes = filteredNames.filter(({ type }) => type.includes("prefix"));
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffixes = filteredNames.filter(({ type }) => type.includes("suffix"));
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  if (prefix === undefined || suffix === undefined) {
    throw Error("Invalid name.");
  }

  const connector = prefix.name[prefix.name.length - 1] === suffix.name[0] ? "-" : "";
  const filteredAffixes = AFFIXES.filter((current) => {
    const { creature, isNSFW, name } = current;

    const filterNSFW = allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW;

    if (name === prefix.name || name === suffix.name || name.slice(-3) === "ing") {
      return false;
    }

    return (creature === "prefix" || creature === "suffix") && filterNSFW;
  });
  const filteredCreatures = CREATURES.filter((current) => {
    const { isNSFW, type } = current;

    const filterNSFW = allowNSFW ? Boolean(isNSFW) || !isNSFW : !isNSFW;

    return type === "monster" && filterNSFW;
  });
  const filteredTitles = filteredAffixes.concat(filteredCreatures);
  const title = hasTitle && filteredTitles[Math.floor(Math.random() * filteredTitles.length)];

  if (title === undefined) {
    throw Error("Invalid title.");
  }

  return `${capitalizeAll(prefix.name)}${connector}${suffix.name}${
    title === false ? "" : `, the ${capitalizeAll(title.name)}`
  }`;
}