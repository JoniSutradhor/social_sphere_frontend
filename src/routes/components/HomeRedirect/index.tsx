import { Navigate } from 'react-router';
import SocialSphereApiAuth from 'api/socialSphereApiAuth';
import routes from 'routes/index';

function HomeRedirect() {
    return (
        <Navigate
            to={SocialSphereApiAuth.isAuthenticated() ? routes.socialSphereHome.path : routes.login.path}
            replace
        />
    );
}

export default HomeRedirect;
