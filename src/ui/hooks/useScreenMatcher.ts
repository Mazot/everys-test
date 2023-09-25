import * as React from 'react';

const MOBILE_PORTRAIT_WIDTH = 600;

export const useScreenMatcher = (screenWidth: number = MOBILE_PORTRAIT_WIDTH) => {
  const [isMatch, setMatch] = React.useState(window.innerWidth <= screenWidth);
  const updateMatch = React.useCallback((event: MediaQueryListEvent) => {
      setMatch(event.matches);
  },[]);

  const mediaMatcher = window.matchMedia(`(max-width: ${screenWidth}px)`);

  const isEventListenerSupported = 'addEventListener' in mediaMatcher;

  React.useEffect(() => {
    if (isEventListenerSupported) {
      mediaMatcher.addEventListener('change', updateMatch);
    } else {
      (mediaMatcher as MediaQueryList).addListener(updateMatch);
    }

    return () => {
      if (isEventListenerSupported) {
        mediaMatcher.removeEventListener('change', updateMatch);
      } else {
        (mediaMatcher as MediaQueryList).removeListener(updateMatch);
      }
    }
  }, [isEventListenerSupported, mediaMatcher, updateMatch]);

  return isMatch;
};

