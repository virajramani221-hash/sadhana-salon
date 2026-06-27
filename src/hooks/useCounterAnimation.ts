import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export function useCounterAnimation(endValue: number, duration: number = 2) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.innerHTML = endValue.toString();
      return;
    }

    const obj = { val: 0 };
    
    const animation = gsap.to(obj, {
      val: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (node) node.innerHTML = Math.round(obj.val).toString();
      },
      scrollTrigger: {
        trigger: node,
        start: "top 85%",
      }
    });

    return () => {
      animation.kill();
    };
  }, [endValue, duration, prefersReducedMotion]);

  return nodeRef;
}
