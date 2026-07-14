import AuthLayout from 'layouts/Auth';
import { AuthLayoutPageEnum } from 'layouts/Auth/utils';
import RegistrationForm from './components/RegistrationForm';

function Registration() {
    return (
        <AuthLayout page={AuthLayoutPageEnum.REGISTRATION}>
            <RegistrationForm />
        </AuthLayout>
    );
}

export default Registration;