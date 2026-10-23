import { useEffect, useRef } from 'react';

/**
 * useScrollAnimations — wires up IntersectionObserver for scroll-triggered
 * entrance animations. Elements with .anim-fade-up, .anim-fade-left,
 * .anim-fade-right, .anim-scale-in will get .is-visible when they enter
 * the viewport, triggering their CSS transitions.
 */
export function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeAll = () => {
      const animatedEls = document.querySelectorAll(
        '.anim-fade-up:not(.is-visible), .anim-fade-left:not(.is-visible), .anim-fade-right:not(.is-visible), .anim-scale-in:not(.is-visible)'
      );
      animatedEls.forEach((el) => observer.observe(el));
    };

    // Initial pass
    observeAll();

    // Re-check after render ticks
    const t1 = setTimeout(observeAll, 100);
    const t2 = setTimeout(observeAll, 500);

    // MutationObserver to catch dynamically added items
    const mutObserver = new MutationObserver(() => {
      observeAll();
    });

    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, []);
}
