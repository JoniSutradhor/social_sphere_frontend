import { useMemo } from 'react';
import { useLocation } from 'react-router';
import routes from '..';

const useCurrentRoute = () => {
    const location = useLocation();
    const routeObject = useMemo(
        () =>
            Object.values(routes).find(
                (route) => route.path === location.pathname
            ),
        [location.pathname]
    );
    return routeObject;
};

export default useCurrentRoute;
