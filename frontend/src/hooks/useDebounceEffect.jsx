import { useEffect } from "react";

// useDebounceEffect thanks to Todd Skelton
// https://stackoverflow.com/a/61127960

export const useDebounceEffect = (effect, delay) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], delay])
}