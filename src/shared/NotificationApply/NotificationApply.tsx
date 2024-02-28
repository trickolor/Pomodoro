import React, { useRef } from 'react';
import styles from './notificationapply.css';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useDispatch } from 'react-redux';
import { TOGGLE_POPUP } from '../redux_store/notification_reducer';
import { useDispatchAll } from '../../hooks/useDisaptchAll';
import { SET_NOTIFICATION_ALLOWED } from '../redux_store/settings_reducer';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export function NotificationApply() {
  const { permission } = Notification;
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => dispatch(TOGGLE_POPUP()));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Уведомления
      </h2>

      {permission === 'default' &&
        <p className={styles.paragraph}>
          Наше приложение поддерживает браузерные уведомления для комфортного пользовательского опыта и отслеживания Вашей работы с таймером. Желаете включить уведомления? Вы сможете изменить свое решение в настройках приложения.
        </p>
      }

      {permission === 'denied' &&
        <p className={styles.paragraph}>
          Наше приложение поддерживает браузерные уведомления для комфортного пользовательского опыта и отслеживания Вашей работы с таймером, но доступ к уведомлениям запрещен в настройках Вашего браузера. Пожалуйста, разрешите уведомления в браузере для возможности включения уведомлений в настройках приложения.
        </p>
      }

      {permission === 'default' &&
        <Button className={styles.applyButton} text={'Включить уведомления'}
          callback={() => Notification.requestPermission().then(
            () => {
              useDispatchAll(dispatch, [
                TOGGLE_POPUP(),
                SET_NOTIFICATION_ALLOWED(true)
              ]);
            },
            () => {
              useDispatchAll(dispatch, [
                TOGGLE_POPUP(),
                SET_NOTIFICATION_ALLOWED(false)
              ])
            }
          )}
        />
      }

      <Button className={styles.denyButton} text={permission === 'default' ? 'Отклонить' : 'Закрыть'} callback={() => useDispatchAll(dispatch, [TOGGLE_POPUP(), SET_NOTIFICATION_ALLOWED(false)])} />
      <Button className={styles.closeButton} children={<Icon name='Cross' />} callback={() => useDispatchAll(dispatch, [TOGGLE_POPUP(), SET_NOTIFICATION_ALLOWED(false)])} />
    </div>
  );
}
