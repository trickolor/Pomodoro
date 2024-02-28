import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TCombinedState } from "../shared/redux_store/store";
import { TTask } from "../shared/redux_store/tasks_reducer";

export function usePageFixation() {
    const tasks = useSelector<TCombinedState, TTask[]>(state => state.tasks.all);
    const isDeleteConfirmOpen = tasks.some((task) => task.deleteConfirm === true);
    const isSettingsOpen = useSelector<TCombinedState, boolean>(state => state.settings.settingsOpen);
    const isNotificationApplyOpen = useSelector<TCombinedState, boolean>(state => state.notification.popupOpen);

    const conditionArr = [isDeleteConfirmOpen, isSettingsOpen, isNotificationApplyOpen]

    useEffect(() => {
        const isClient = typeof window === 'object';
        if (!isClient) return;

        const isModalOpen = conditionArr.some((cond) => cond === true);

        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            return;
        }

        document.body.style.overflow = 'auto';

    }, conditionArr)
}