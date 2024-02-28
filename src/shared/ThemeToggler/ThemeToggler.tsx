import React, { useEffect, useRef } from 'react';
import styles from './themetoggler.css';
import { Animation } from '../Animation';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { TModeState, TOGGLER_FLAG, TOGGLE_MODE } from '../redux_store/mode_reducer';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { Icon } from '../Icon';

export function ThemeToggler() {
  const dispatch = useDispatch();
  const { isDark, togglerFlag } = useSelector<TCombinedState, TModeState>(state => state.mode);

  const togglerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (isDark && togglerRef.current) {
      const circle = togglerRef.current.firstChild as HTMLElement;
      circle.style.transform = 'translate(23px)';
    }
  }, []);

  return (
    <div ref={togglerRef} className={styles.container} onClick={() => useDispatchAll(dispatch, [TOGGLE_MODE(), TOGGLER_FLAG(true)])}>
      <Animation
        containerClass={styles.circle}
        deps={[isDark]}
        shouldAnimate={togglerFlag}
        tweens={[
          isDark ?
            {
              method: 'to',
              animateChildren: false,
              keyframes: { x: 23 },
              callback: () => dispatch(TOGGLER_FLAG(false))
            }
            : {
              method: 'to',
              animateChildren: false,
              keyframes: { x: 0 },
              callback: () => dispatch(TOGGLER_FLAG(false))
            }
        ]}
        children={
          <>
            {isDark &&
              <Icon name='Moon' />
            }
            {!isDark &&
              <Icon name='Sun' />
            }

          </>
        }
      />
    </div>
  )
}
