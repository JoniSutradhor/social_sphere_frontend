import { memo, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import SocialSphereApiAuth from 'api/socialSphereApiAuth';
import routes from 'routes/index';

interface AuthGuardProps {
    children: ReactNode;
    guestOnly?: boolean;
}

function AuthGuard({ children, guestOnly = false }: AuthGuardProps) {
    const isAuthenticated = SocialSphereApiAuth.isAuthenticated();

    if (guestOnly && isAuthenticated) {
        return <Navigate to={routes.socialSphereHome.path} replace />;
    }

    if (!guestOnly && !isAuthenticated) {
        return <Navigate to={routes.login.path} replace />;
    }

    return children;
}

export default memo(AuthGuard);
