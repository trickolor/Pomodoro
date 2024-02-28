import React from 'react';
import styles from './settingsinput.css';
import { Field, useFormikContext } from 'formik';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_SETTINGS_OPEN, TSettingsState } from '../redux_store/settings_reducer';
import { TCombinedState } from '../redux_store/store';
import { TOGGLE_POPUP } from '../redux_store/notification_reducer';
import { useDispatchAll } from '../../hooks/useDisaptchAll';

export interface ISettingsInputProps {
  inputName: string;
  name: string;
  as?: string;
  type?: string;
}

export function SettingsInput({ inputName, name, as = 'input', type = 'text' }: ISettingsInputProps) {
  const { work, pauseShort, pauseLong, frequency } = useSelector<TCombinedState, TSettingsState>(state => state.settings);
  const { setFieldValue } = useFormikContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values }: Record<string, any> = useFormikContext();
  const dispatch = useDispatch();
  const { permission } = Notification;

  const initialValues = {
    'work': work / 60,
    'pauseShort': pauseShort / 60,
    'pauseLong': pauseLong / 60,
    'frequency': frequency
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isInputValid = /^[0-9\b\t\n\r]+$/.test(event.key);
    const maxCharCount = event.currentTarget.value.length === 2;
    const keyIsBackspace = event.key === 'Backspace';

    if (!isInputValid || (maxCharCount && !keyIsBackspace)) event.preventDefault();
  };

  const handleDecrease = () => {
    const valueKey = name as keyof typeof values;
    const value = values[valueKey];

    if (value <= 1) return;

    setFieldValue(name, parseInt(value) - 1);
  };

  const handleIncrease = () => {
    const valueKey = name as keyof typeof values;
    const value = values[valueKey];

    if (value >= 99) return;

    setFieldValue(name, parseInt(value) + 1);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const fieldName = event.target.name as keyof typeof initialValues;

    const hasZeroValue = ['0', '00', '000'].includes(inputValue) || inputValue === '';
    const startsWithZero = inputValue.startsWith('0') && inputValue.length > 1;

    if (!hasZeroValue && !startsWithZero) return;

    if (hasZeroValue) {
      setFieldValue(fieldName, initialValues[fieldName] * (fieldName === 'frequency' ? 1 : 60));
      return;
    }

    if (startsWithZero) {
      inputValue = inputValue.replace(/^0+/, '');
      setFieldValue(fieldName, parseInt(inputValue));
      return;
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.inputName}>
        {inputName}
      </span>

      {(type === 'text') &&
        <div className={styles.inputBox}>
          <Button type='button' className={styles.buttonLeft} children={<Icon name='Triangle' />} callback={handleDecrease} />
          <Field
            type={type}
            className={styles.input}
            as={as}
            name={name}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
          />
          <Button type='button' className={styles.buttonRight} children={<Icon name='Triangle' />} callback={handleIncrease} />
        </div>
      }

      {(type === 'checkbox') &&
        <>
          <Field
            type={type}
            className={styles.checkbox}
            as={as}
            id={name}
            name={name}
            autoComplete={'off'}
          />
          <label className={styles.label} htmlFor={name} onClick={() => {
            if (permission !== 'granted') {
              useDispatchAll(dispatch, [TOGGLE_POPUP(), TOGGLE_SETTINGS_OPEN()])
            }
          }}
          >
            {values[name] &&
              <Icon name='Check' />
            }
          </label>
        </>
      }
    </div>
  );
}
