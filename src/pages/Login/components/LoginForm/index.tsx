import { memo } from 'react';
import {
    Box,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    Link,
} from '@mui/material';
import { assetUrl } from 'utils/url';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from 'pages/Login/validation/index.schema';
import { ControlledTextField } from 'components/ControlledTextField';
import ControlledLoadingButton from 'components/ControlledLoadingButton';
import SocialSphereApiAuth from 'api/socialSphereApiAuth';
import { useNavigate } from 'react-router';
import { toast } from 'core_components/Toaster';
import { AuthLayoutPageEnum } from 'layouts/Auth/utils';


function LoginForm() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: {
            isSubmitting,
            isValid,
        },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: LoginFormData) => {
        try {
            const response = await SocialSphereApiAuth.login(values);

            SocialSphereApiAuth.saveSession(response);

            toast.success('Login successful');

            navigate('/feed');
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Unable to login';

            toast.error(message);
        }
    };

    return (
        <Box>
            <Typography sx={{ color: '#2D3748', textAlign: 'center', mb: '8px' }}>
                Welcome back
            </Typography>
            <Typography
                sx={{ fontSize: 28, textAlign: 'center', fontWeight: 500, mb: '50px' }}
            >
                Login to your account
            </Typography>

            <Button
                fullWidth
                variant="outlined"
                startIcon={
                    <Box
                        component="img"
                        src={assetUrl('/auth/google.svg')}
                        alt="Google"
                        sx={{ maxWidth: 20 }}
                    />
                }
                sx={{
                    mb: '40px',
                    py: '12px',
                    px: '60px',
                    textTransform: 'none',
                    borderColor: '#F0F2F5',
                    bgcolor: '#FFFFFF',
                    color: '#312000',
                    fontWeight: 500,
                    borderRadius: '6px',
                    '&:hover': { borderColor: '#F0F2F5', boxShadow: 'none' },
                }}
            >
                Or sign-in with google
            </Button>

            <Box sx={{ position: 'relative', textAlign: 'center', mb: '40px' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: '11px',
                        width: 108,
                        height: 0,
                        borderTop: '1px solid #DFDFDF',
                        borderRadius: '6px',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: '11px',
                        width: 108,
                        height: 0,
                        borderTop: '1px solid #DFDFDF',
                        borderRadius: '6px',
                    }}
                />
                <Typography component="span" sx={{ fontSize: 14, color: '#C4C4C4' }}>
                    Or
                </Typography>
            </Box>

            <Box component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ textAlign: 'left' }}>

                <ControlledTextField
                    control={control}
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    sx={{
                        mb: '14px',
                        '& .MuiOutlinedInput-root': {
                            height: 48,
                            borderRadius: '6px',
                        },
                    }}
                />

                <ControlledTextField
                    control={control}
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    sx={{
                        mb: '14px',
                        '& .MuiOutlinedInput-root': {
                            height: 48,
                            borderRadius: '6px',
                        },
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mt: 1,
                    }}
                >
                    <FormControlLabel
                        control={<Radio checked sx={{ color: '#1890FF' }} />}
                        label="Remember me"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: 14, color: '#2D3748' } }}
                    />
                    <Link
                        href="#"
                        underline="none"
                        sx={{ color: '#1890FF', fontSize: 14 }}
                    >
                        Forgot password?
                    </Link>
                </Box>
                <ControlledLoadingButton
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                    disabled={!isValid}
                    sx={{
                        mt: '40px',
                        mb: '60px',
                    }}
                >
                    Login now
                </ControlledLoadingButton>
            </Box>

            <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
                Dont have an account?{' '}
                <Link href={AuthLayoutPageEnum.REGISTRATION} underline="none" sx={{ color: '#1890FF' }}>
                    Create New Account
                </Link>
            </Typography>
        </Box>
    );
}

export default memo(LoginForm);