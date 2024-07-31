import { useEffect } from 'react';

export default function TouchHandler() {
  let slideBeginX = 0;

  const touchStart = (event: TouchEvent) => {
    event.preventDefault();
    slideBeginX = event.targetTouches[0].pageX;
  };

  const touchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const touchEnd = (event: TouchEvent) => {
    const slideEndX = event.changedTouches[0].pageX;

    if (Math.abs(slideEndX - slideBeginX) > 200) {
      if (slideEndX - slideBeginX > 0) {
        event.preventDefault();
        // User scrolled from left to right
      }
      if (slideEndX - slideBeginX < 0) {
        event.preventDefault();
        // User scrolled from right to left
      }
      if (slideEndX - slideBeginX === 0) {
        // User scrolled from left to right
      }
    }
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener('touchstart', touchStart, { passive: false });
    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd, { passive: false });

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener('touchstart', touchStart);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', touchEnd);
    };
  }, []);

  return null;
}
