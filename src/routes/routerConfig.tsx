import React from 'react';
import { Outlet } from 'react-router';
import { SuspensedComponent } from 'utils/react';
// import PageLoader from './components/PageLoader';
import routes from './index';
import PageLoader from './components/PageLoader';
import FeedPostWrapper from 'pages/Feed';
import AuthGuard from 'components/AuthGuard';
import HomeRedirect from './components/HomeRedirect';

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));

const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);
const Login = PageLoader(
    React.lazy(() => import('pages/Login'))
);
const Registration = PageLoader(
    React.lazy(() => import('pages/Registration'))
);

const routesConfig = [
    {
        Component: AppRoot,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: routes.home.path,
                        element: <HomeRedirect />,
                    },
                ],
            },
            {
                element: <Outlet />,
                children: [
                    {
                        path: routes.login.path,
                        element: (
                            <AuthGuard guestOnly>
                                <Login />
                            </AuthGuard>
                        ),
                    },
                    {
                        path: routes.registration.path,
                        element: (
                            <AuthGuard guestOnly>
                                <Registration />
                            </AuthGuard>
                        ),
                    },
                ],
            },
            {
                path: routes.socialSphereHome.path,
                element: (
                    <AuthGuard>
                        <FeedPostWrapper />
                    </AuthGuard>
                ),
            },
        ],
    },
];

export default routesConfig;
