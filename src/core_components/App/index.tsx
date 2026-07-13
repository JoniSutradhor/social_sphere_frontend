import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import { SuspensedComponent } from 'utils/react';

const RouterProvider = SuspensedComponent(
    React.lazy(() => import('routes/components/RouterProvider'))
);

const App = () => (
    <ErrorBoundary>
        <RouterProvider />
    </ErrorBoundary>
);

export default App;
