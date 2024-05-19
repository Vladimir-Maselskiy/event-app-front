import { useEffect, useState } from 'react';

const getWindowWidth = () => {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const handleResize = () => setWindowWidth(getWindowWidth());

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidth, handleResize };
};

export const useMediaQuery = (maxWidth: number) => {
  const { windowWidth, handleResize } = useWindowWidth();
  const [isMedia, setIsMedia] = useState(false);
  useEffect(() => {
    handleResize();
    if (windowWidth <= maxWidth) {
      setIsMedia(false);
    } else {
      setIsMedia(true);
    }
  }, [windowWidth]);
  return isMedia;
};
