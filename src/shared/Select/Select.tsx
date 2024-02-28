import React, { useRef } from 'react';
import styles from './select.css';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { SELECT_ANIMATION_FLAG, TOGGLE_SELECT_OPEN, TSelectState } from '../redux_store/select_reducer';
import { Icon } from '../Icon';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { AnimatedSelectList } from '../container_components/animated_components/AnimatedSelectList';

export function Select() {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const { options, isOpen, animationFlag, order } = useSelector<TCombinedState, TSelectState>(state => state.select);
  const firstIndex = order[0];

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.optionCurrent} onClick={() => useDispatchAll(dispatch, [TOGGLE_SELECT_OPEN(), SELECT_ANIMATION_FLAG(true)])}>
        {options[firstIndex]}

        <div className={isOpen ? styles.iconContainerReverse : styles.iconContainer}>
          <Icon name='Arrow' />
        </div>
      </div>

      {(isOpen || animationFlag) &&
        <AnimatedSelectList excludeRef={ref} />
      }
    </div>
  );
}
