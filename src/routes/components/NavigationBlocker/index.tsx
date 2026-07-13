import React, { useCallback, useEffect } from 'react';
import { useBlocker } from 'react-router';
import DialogConfirm from 'components/DialogConfirm';
import { isNavigationBlocked as checkIsNavigationBlocked } from 'store/appSettings/selectors';
import Translation from 'components/Translation';
import { setNavigationBlocked } from 'store/appSettings/actions';
import useAppSettingsStore from 'store/appSettings';

const window = require('global/window');

export const onBeforeUnloadNavigationBlocker = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.returnValue = '';
};

const NavigationBlocker = () => {
    const isNavigationBlocked = useAppSettingsStore(checkIsNavigationBlocked);

    const blocker = useBlocker(isNavigationBlocked);
    const isBlocked = blocker.state === 'blocked';

    useEffect(() => {
        if (isNavigationBlocked) {
            window.addEventListener(
                'beforeunload',
                onBeforeUnloadNavigationBlocker
            );
        } else {
            window.removeEventListener(
                'beforeunload',
                onBeforeUnloadNavigationBlocker
            );
        }

        return () => {
            window.removeEventListener(
                'beforeunload',
                onBeforeUnloadNavigationBlocker
            );
        };
    }, [isNavigationBlocked]);

    const handleConfirm = useCallback(() => {
        if (blocker.proceed) {
            blocker.proceed();
        }
        setNavigationBlocked('');
    }, [blocker]);

    const handleClose = useCallback(() => {
        if (blocker.reset) {
            blocker.reset();
        }
    }, [blocker]);

    return isBlocked ? (
        <DialogConfirm
            open={true}
            onConfirm={handleConfirm}
            onClose={handleClose}
            title={<Translation index="global/nav-blocker-title" />}
            successLabel={<Translation index="global/yes" />}
            closeLabel={<Translation index="global/no" />}
        >
            <Translation index="global/nav-blocker" />
        </DialogConfirm>
    ) : null;
};

export default React.memo(NavigationBlocker);
