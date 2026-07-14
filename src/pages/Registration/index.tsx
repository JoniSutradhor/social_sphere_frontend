import AuthLayout from 'layouts/Auth';
import RegistrationLeftPanel from './components/RegistrationLeftPanel';

function Registration() {
    return <AuthLayout leftPanel={<RegistrationLeftPanel />} />;
}

export default Registration;