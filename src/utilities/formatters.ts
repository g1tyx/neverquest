export function capitalizeAll(string: null | string | undefined) {
  if (!string) {
    return "";
  }

  // ^ matches the beginning of the string.
  // \w matches any word character.
  // {1} takes only the first character.
  // Thus, ^\w{1} matches the first letter of the word.
  // | works like the boolean OR. It matches the expression after and before the |.
  // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks)
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function formatMilliseconds(ms: number) {
  if (ms <= 0 || Number.isNaN(ms)) {
    return "--";
  }

  let seconds = ms / 1000;
  let minutes = Math.floor(seconds / 60);
  let hours = 0;
  let hoursDisplay = "";
  let minutesDisplay = "";

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hoursDisplay = hours >= 10 ? `${hours}` : `0${hours}`;
    minutes -= hours * 60;
    minutesDisplay = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  const secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`;

  if (hours > 0) {
    return `${hoursDisplay}h${minutesDisplay}m${secondsDisplay}s`;
  }
  if (minutes > 0) {
    return `${minutesDisplay}m${secondsDisplay}s`;
  }
  if (seconds > 10) {
    return `${secondsDisplay}s`;
  }

  return `${formatToFixed(ms / 1000)}s`;
}

export function formatPercentage(number: number) {
  return `${formatToFixed(number * 100)}%`;
}

// Correctly does the rounding as opposed to .toFixed().
export function formatToFixed(number: number, decimals = 2) {
  const multiplier = 10 ** decimals;
  const result = parseFloat((number * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(decimals);
}