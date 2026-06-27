import { gsap } from "gsap";

export const fadeUp = (element: Element | string, delay: number = 0) => {
  return gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
};

export const staggerFadeUp = (elements: Element[] | string, staggerAmount: number = 0.1) => {
  return gsap.from(elements, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: staggerAmount,
    scrollTrigger: {
      trigger: elements,
      start: "top 85%",
    },
  });
};
