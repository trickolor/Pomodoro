import React, { ChangeEvent, FormEvent } from 'react';
import styles from './form.css';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { ADD_TASK, TTask } from '../redux_store/tasks_reducer';
import { ADD_TIME_STEP, CHANGE_TIMER_TYPE } from '../redux_store/timer_reducer';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { CHANGE_FORM_INPUT_VALUE } from '../redux_store/input_reducer';
import { TFormValues } from '../Settings';

export function Form() {
  const inputValue = useSelector<TCombinedState, string>(state => state.input.formInputValue);
  const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
  const values = useSelector<TCombinedState, TFormValues>(state => state.settings);

  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue === '') return;

    useDispatchAll(dispatch, [
      ADD_TASK({
        name: inputValue,
        taskOrder: tasks.length,
        editMode: false,
        menuOpen: false,
        deleteConfirm: false,
        firstMount: false,
        quantityChange: false,
        animationFlags: {
          container: false,
          complete: false,
        }
      }),
      ADD_TIME_STEP(tasks.length, values),
      CHANGE_FORM_INPUT_VALUE('')
    ]);

    if (!tasks.length) dispatch(CHANGE_TIMER_TYPE('ready'));
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => dispatch(CHANGE_FORM_INPUT_VALUE(event.target.value));


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" placeholder='Название задачи' value={inputValue} onChange={handleChange} />
      <Button className={styles.button} text='Добавить' />
    </form>
  );
}
