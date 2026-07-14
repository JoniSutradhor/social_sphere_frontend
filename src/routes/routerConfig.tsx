import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { SuspensedComponent } from 'utils/react';
// import PageLoader from './components/PageLoader';
import routes from './index';
import PageLoader from './components/PageLoader';

// const DashboardLayout = SuspensedComponent(
//     React.lazy(() => import('layouts/Dashboard'))
// );
// const SignUpLayout = SuspensedComponent(
//     React.lazy(() => import('layouts/SignUp'))
// );

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));
// const AuthLayout = SuspensedComponent(React.lazy(() => import('layouts/Auth')));
const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);
// const AuthGuard = PageLoader(
//     React.lazy(() => import('components/AuthGuard') as any)
// );
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
                        element: (
                            <Navigate to={routes.home.path} replace />
                        ),
                    },
                ],
            },
            {
                element: <Outlet />,
                children: [
                    {
                        path: routes.login.path,
                        element: <Login />,
                    },
                    {
                        path: routes.registration.path,
                        element: <Registration />,
                    },
                ],
            },
        ],
    },
];

export default routesConfig;
