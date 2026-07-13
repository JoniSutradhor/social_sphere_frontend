import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import AppLoader from 'core_components/AppLoader';
import { SuspensedComponent } from 'utils/react';

const Toaster = SuspensedComponent(
    React.lazy(() => import('core_components/Toaster'))
);

export interface AppRootProps {
    children: ReactNode;
}

const AppRoot = ({ children = null }: AppRootProps) => {
    return (
        <>
            <AppLoader>
                <Toaster />
                {children}
                <Outlet />
            </AppLoader>
        </>
    );
};

export default React.memo(AppRoot);
