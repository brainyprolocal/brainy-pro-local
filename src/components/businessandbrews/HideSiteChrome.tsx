'use client';

import { useEffect } from 'react';

/**
 * Hides the main site Header, Footer, and ScrollToTop button
 * on Business & Brews pages. Restores them on unmount.
 */
export default function HideSiteChrome() {
  useEffect(() => {
    const header = document.querySelector('body > header');
    const footer = document.querySelector('body > footer');
    const scrollBtn = document.querySelector('body > button');

    if (header) (header as HTMLElement).style.display = 'none';
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (scrollBtn) (scrollBtn as HTMLElement).style.display = 'none';

    return () => {
      if (header) (header as HTMLElement).style.display = '';
      if (footer) (footer as HTMLElement).style.display = '';
      if (scrollBtn) (scrollBtn as HTMLElement).style.display = '';
    };
  }, []);

  return null;
}
