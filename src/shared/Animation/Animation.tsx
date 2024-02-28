import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export type TOutsideClickPreset = {
  callback: () => void;
  excludeRef?: React.RefObject<HTMLDivElement>
}

export type TTweenPreset = {
  animateChildren?: boolean | React.RefObject<HTMLElement>;
  method: 'from' | 'to' | 'fromTo' | 'set';
  keyframes: gsap.TweenVars;
  callback?: () => void;
};

interface IAnimationProps {
  containerClass: string;
  children?: React.ReactNode;
  textContent?: string;
  shouldAnimate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[];
  tweens: TTweenPreset[];
  outsideClick?: TOutsideClickPreset;
}

export function Animation({
  containerClass,
  children,
  shouldAnimate,
  textContent,
  deps,
  tweens,
  outsideClick,
}: IAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hook = typeof window === 'object' ? useLayoutEffect : useEffect;

  const getChildElements = (parent: HTMLElement, animateChildren?: boolean | React.RefObject<HTMLElement>) => {
    if (!animateChildren) return parent;

    if (typeof animateChildren === 'boolean') return animateChildren ? Array.from(parent.children) : [];

    if (animateChildren && animateChildren.current) return animateChildren.current;

    return parent;
  };

  hook(() => {
    const animateElement = ref.current;
    if (!animateElement) return;

    if (!shouldAnimate || gsap.isTweening(animateElement)) return;

    const playTweensRecursively = (index: number) => {
      if (index >= tweens.length) return;
      const tween = tweens[index];

      const handleCallback = () => {
        if (tween.callback) tween.callback();
        playTweensRecursively(index + 1)
      }

      const tl = gsap.timeline();
      switch (tween.method) {
        case 'from':
          tl.from(
            getChildElements(animateElement, tween.animateChildren),
            tween.keyframes
          ).then(handleCallback);
          break;
        case 'to':
          tl.to(
            getChildElements(animateElement, tween.animateChildren),
            tween.keyframes
          ).then(handleCallback);
          break;
        case 'fromTo':
          tl.fromTo(
            getChildElements(animateElement, tween.animateChildren),
            tween.keyframes.from,
            tween.keyframes.to
          ).then(handleCallback);
          break;
        case 'set':
          gsap.set(
            getChildElements(animateElement, tween.animateChildren),
            tween.keyframes
          );
          playTweensRecursively(index + 1);
          break;
        default:
          playTweensRecursively(index + 1);
          break;
      }
    };

    playTweensRecursively(0);
  }, deps ? deps : []);

  if (outsideClick) useOutsideClick(ref, outsideClick.callback, outsideClick.excludeRef);

  return (
    <div className={containerClass} ref={ref}>
      {children}
      {textContent}
    </div>
  );
}