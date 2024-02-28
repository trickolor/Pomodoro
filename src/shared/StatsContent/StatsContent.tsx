import React from 'react';
import styles from './statscontent.css';
import { Select } from '../Select';
import { useSelector } from 'react-redux';
import { TCombinedState } from '../redux_store/store';
import { Settings } from '../Settings';
import { ModalAnimation } from '../container_components/animated_components/ModalAnimation';
import { useInjection } from '../../hooks/useInjection';
import { AnimatedHeader } from '../container_components/animated_components/AnimatedHeader';
import { usePageFixation } from '../../hooks/usePageFixation';
import { AnimatedStats } from '../container_components/animated_components/AnimatedStats';
import { useBuffer } from '../../hooks/useBuffer';

export function StatsContent() {
  const settingsOpen = useSelector<TCombinedState, boolean>(state => state.settings.settingsOpen);

  useBuffer();
  useInjection();
  usePageFixation();

  return (
    <>
      <AnimatedHeader />

      <main className={styles.container}>
        <div className={styles.topLine}>
          <h1 className={styles.title}>
            Ваша активность
          </h1>

          <Select />
        </div>

        <AnimatedStats />
      </main>

      {settingsOpen &&
        <ModalAnimation>
          <Settings />
        </ModalAnimation>
      }
    </>
  );
}
