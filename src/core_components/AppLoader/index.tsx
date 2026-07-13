import React, { type ReactNode } from 'react';
import Initializing from 'pages/Initializing';

export interface AppLoaderProps {
    children?: ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
    const isInitialized = true; // TODO: Replace with actual initialization logic


    return isInitialized ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    ) : (
        <Initializing />
    );
};

export default React.memo(AppLoader);
