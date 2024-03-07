import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Notification, { NotificationProps } from '@components/notification/notification';
import { useLocale } from '@hooks/useLocale';

let notificationContainer = null;

export const notification = {
    showNotification(params: Omit<NotificationProps, 'children'>) {
        if (localStorage.getItem(params.notificationKey)) {
            return;
        }
        console.log(params);
        if (!document.getElementById('global-notification')) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'global-notification';
            document.getElementById('root-body').appendChild(notificationContainer);
            ReactDOM.createRoot(notificationContainer).render(<Notification {...params} />);
        }
    },

    unmountNotification(key) {
        if (notificationContainer) {
            localStorage.setItem(key, 'true');
            ReactDOM.hydrateRoot(notificationContainer, null);
            document.getElementById('root-body').removeChild(notificationContainer);
        }
    },
};
const useNotification = () => {
    const locales = useLocale('components');
    useEffect(() => {
        notification.showNotification({
            title: '',
            content: locales.notificationContent,
            notificationKey: '__HuiXiangDou__',
        });
    }, [locales]);
};

export default useNotification;
