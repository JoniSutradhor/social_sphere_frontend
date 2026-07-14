import { memo } from 'react';
import {
    Box,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    Link,
} from '@mui/material';
import { assetUrl } from 'utils/url';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from 'pages/Registration/validation/index.schema';
import { ControlledTextField } from 'components/ControlledTextField';
import ControlledLoadingButton from 'components/ControlledLoadingButton';

function RegistrationForm() {
    const {
        control,
        handleSubmit,
        formState: {
            isSubmitting,
            isValid,
        },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    // const onSubmit = async (data: RegistrationFormData) => {
    //     try {
    //         await register(data); // API call
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const onSubmit = async (data: RegistrationFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
    };

    return (
        <Box>
            <Typography sx={{ color: '#2D3748', textAlign: 'center', mb: '8px' }}>
                Get Started Now
            </Typography>
            <Typography
                sx={{ fontSize: 28, textAlign: 'center', fontWeight: 500, mb: '50px' }}
            >
                Registration
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
                Register with google
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
                    name="firstName"
                    label="First Name"
                    fullWidth
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
                    name="lastName"
                    label="Last Name"
                    fullWidth
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

                <ControlledTextField
                    control={control}
                    name="repeatPassword"
                    label="Repeat Password"
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

                <FormControlLabel
                    control={<Checkbox defaultChecked sx={{ color: '#1890FF' }} />}
                    label="I agree to terms & conditions"
                    sx={{
                        mt: 1,
                        '& .MuiFormControlLabel-label': { fontSize: 14, color: '#2D3748' },
                    }}
                />

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
                    Register now
                </ControlledLoadingButton>
            </Box>

            <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link href="#" underline="none" sx={{ color: '#1890FF' }}>
                    Login
                </Link>
            </Typography>
        </Box>
    );
}

export default memo(RegistrationForm);