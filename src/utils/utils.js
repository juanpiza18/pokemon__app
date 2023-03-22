import { debounceUserInputTimeout } from "./constants";

export function debounce(func, timeout = debounceUserInputTimeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
