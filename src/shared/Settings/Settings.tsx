import React, { useRef } from 'react';
import styles from './settings.css';
import { Formik, Form } from 'formik';
import { ISettingsInputProps, SettingsInput } from '../SettingsInput';
import { addKey } from '../../utils/addKey';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { SET_SETTINGS, TOGGLE_SETTINGS_OPEN, TSettingsState } from '../redux_store/settings_reducer';
import { Icon } from '../Icon';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { SET_TIME_STEPS } from '../redux_store/timer_reducer';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export type TFormValues = {
  work: number;
  pauseShort: number;
  pauseLong: number;
  frequency: number;
  notificationsAllowed: boolean;
}

export function Settings() {
  const { work, pauseShort, pauseLong, frequency, notificationsAllowed } = useSelector<TCombinedState, TSettingsState>(state => state.settings);
  const dispatch = useDispatch();

  const inputPreset: ISettingsInputProps[] = [
    {
      inputName: 'Продолжительность «помидора»',
      name: 'work'
    },
    {
      inputName: 'Продолжительность короткого перерыва',
      name: 'pauseShort'
    },
    {
      inputName: 'Продолжительность долгого перерыва',
      name: 'pauseLong'
    },
    {
      inputName: 'Частота длинных перерывов',
      name: 'frequency'
    },
    {
      inputName: 'Уведомления',
      name: 'notificationsAllowed',
      type: 'checkbox'
    }

  ].map(addKey);

  const initialValues: TFormValues = {
    'work': work,
    'pauseShort': pauseShort,
    'pauseLong': pauseLong,
    'frequency': frequency,
    'notificationsAllowed': notificationsAllowed
  }

  const defaultValues: TFormValues = {
    'work': 20,
    'pauseShort': 5,
    'pauseLong': 15,
    'frequency': 4,
    'notificationsAllowed': true
  }

  // eslint-disable-next-line react/jsx-key
  const inputArr = inputPreset.map((i) => <SettingsInput {...i} />)

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => dispatch(TOGGLE_SETTINGS_OPEN()));

  return (
    <div className={styles.container} ref={ref}>
      <Button className={styles.crossButton} children={<Icon name='Cross' />}
        callback={() => dispatch(TOGGLE_SETTINGS_OPEN())}
      />

      <h2 className={styles.title}>
        Настройки
      </h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          useDispatchAll(dispatch, [SET_SETTINGS(values), SET_TIME_STEPS(values)]);
        }}
      >
        {(formikProps) => (
          <Form className={styles.form} autoComplete='off'>
            {...inputArr}

            <div className={styles.buttonBox}>
              <Button type='submit' className={styles.submitButton} text='Применить' />
              <Button
                type='button'
                className={styles.resetButton}
                text='По умолчанию'
                callback={() => {
                  formikProps.resetForm({ values: defaultValues });

                  useDispatchAll(dispatch, [SET_SETTINGS(defaultValues), SET_TIME_STEPS(defaultValues)]);
                }}
              />
              <Button
                className={styles.closeButton}
                text='Закрыть'
                callback={() => {
                  dispatch(TOGGLE_SETTINGS_OPEN());
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}
