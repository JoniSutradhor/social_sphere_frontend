import {
    RouterProvider as RouterProviderDOM,
    createBrowserRouter,
} from 'react-router';
import React, { type ReactNode } from 'react';
import routesConfig from 'routes/routerConfig';
import config from 'utils/config';

export interface RouterProviderProps {
    children?: ReactNode | ReactNode[];
}

const router = createBrowserRouter(routesConfig, {
    basename: config.asset_path,
});

const RouterProvider = () => {
    return <RouterProviderDOM router={router} />;
};

export default React.memo(RouterProvider);
