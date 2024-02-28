import { useEffect } from 'react';

export function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void, excludeRef: React.RefObject<HTMLElement> | null = null) {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const refCondition = ref.current && event.target instanceof Node && !ref.current.contains(event.target);
            const excludeRefCondition = excludeRef && excludeRef.current && event.target instanceof Node && excludeRef.current.contains(event.target);

            if (!refCondition || excludeRefCondition) return;
            callback();

        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };

    }, [ref, excludeRef, callback]);
}
