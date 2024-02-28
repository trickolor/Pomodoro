import React from 'react';
import styles from './instructions.css';
import { IItemProps, List } from '../List';

export function Instructions() {
  const LIST: IItemProps[] = [
    {
      As: 'li',
      children: <span className={styles.dot}>•</span>,
      className: styles.listItem,
      text: 'Выберите категорию и напишите название текущей задачи',
    },
    {
      As: 'li',
      children: <span className={styles.dot}>•</span>,
      className: styles.listItem,
      text: 'Запустите таймер («помидор»)',
    },
    {
      As: 'li',
      children: <span className={styles.dot}>•</span>,
      className: styles.listItem,
      text: 'Работайте пока «помидор» не прозвонит',
    },
    {
      As: 'li',
      children: <span className={styles.dot}>•</span>,
      className: styles.listItem,
      text: 'Сделайте короткий перерыв (3-5 минут)',
    },
    {
      As: 'li',
      children: <>
        <span className={styles.dot}>•</span>Продолжайте работать «помидор» за «помидором», пока задача<br /> не будут выполнена. Каждые 4 «помидора» делайте длинный <br /> перерыв (15-30 минут).
      </>,
      className: styles.listItem
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Ура! Теперь можно начать работать:
      </h1>
      <List As='ul' items={LIST} className={styles.list} />
    </div>
  );
}
