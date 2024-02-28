import React from 'react';
import ReactDOM from 'react-dom';
import { Animation } from '../../Animation';
import styles from '../../main.global.css';

interface IModalAnimationProps {
    children: React.ReactNode;
}

export function ModalAnimation({ children }: IModalAnimationProps) {
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return (
        ReactDOM.createPortal(
            <Animation
                containerClass={styles.modal}
                shouldAnimate={true}
                tweens={[
                    {
                        method: 'from',
                        animateChildren: false,
                        keyframes: { opacity: 0 }
                    }
                ]}
                children={children}
            />
            , node)
    );
}