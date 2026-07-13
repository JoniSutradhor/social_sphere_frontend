import React from 'react';
import { Navigate } from 'react-router';
import { SuspensedComponent } from 'utils/react';
// import PageLoader from './components/PageLoader';
import routes from './index';

// const DashboardLayout = SuspensedComponent(
//     React.lazy(() => import('layouts/Dashboard'))
// );
// const SignUpLayout = SuspensedComponent(
//     React.lazy(() => import('layouts/SignUp'))
// );

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));
const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);
// const AuthGuard = PageLoader(
//     React.lazy(() => import('components/AuthGuard') as any)
// );

const routesConfig = [
    {
        Component: AppRoot,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: routes.home.path,
                        element: (
                            <Navigate to={routes.home.path} replace />
                        ),
                    },
                ],
            },
        ],
    },
];

export default routesConfig;
