import AuthLayout from 'layouts/Auth';
import { AuthLayoutPageEnum } from 'layouts/Auth/utils';
import LoginForm from './components/LoginForm';

function Login() {
    return (
        <AuthLayout page={AuthLayoutPageEnum.LOGIN}>
            <LoginForm />
        </AuthLayout>
    );
}

export default Login;