import React, { type ReactNode } from 'react';
import Initializing from 'pages/Initializing';

export interface AppLoaderProps {
    children?: ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
    const isInitialized = true;


    return isInitialized ? (
        <>{children}</>
    ) : (
        <Initializing />
    );
};

export default React.memo(AppLoader);
