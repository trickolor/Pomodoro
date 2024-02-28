import React, { useRef } from 'react';
import styles from './deleteconfirm.css';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useDispatch } from 'react-redux';
import { TASK_COMPLETE_ANIMATION_FLAG, TOGGLE_DELETE_CONFIRM } from '../redux_store/tasks_reducer';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useDispatchAll } from '../../hooks/useDisaptchAll';

interface IDeleteConfirmProps {
  taskOrder: number;
}

export function DeleteConfirm({ taskOrder }: IDeleteConfirmProps) {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => dispatch(TOGGLE_DELETE_CONFIRM(taskOrder)));

  return (
    <div className={styles.container} ref={ref}>
      <h2 className={styles.title} >Удалить задачу?</h2>

      <Button className={styles.deleteButton} text='Удалить' callback={() => useDispatchAll(dispatch, [dispatch(TASK_COMPLETE_ANIMATION_FLAG(taskOrder, true)), dispatch(TOGGLE_DELETE_CONFIRM(taskOrder))])} />
      <Button className={styles.cancelButton} text='Отмена' callback={() => dispatch(TOGGLE_DELETE_CONFIRM(taskOrder))} />
      <Button className={styles.crossButton} children={<Icon name='Cross' />} callback={() => dispatch(TOGGLE_DELETE_CONFIRM(taskOrder))} />
    </div>
  );
}
