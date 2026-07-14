import { memo, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    FormControlLabel,
    Radio,
    Link,
} from '@mui/material';
import { assetUrl } from 'utils/url';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            <Box component="form" noValidate sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#4A5568', mb: '8px' }}>
                    Email
                </Typography>
                <TextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        mb: '14px',
                        '& .MuiOutlinedInput-root': { height: 48, borderRadius: '6px' },
                    }}
                />

                <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#4A5568', mb: '8px' }}>
                    Password
                </Typography>
                <TextField
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': { height: 48, borderRadius: '6px' },
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

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        mt: '40px',
                        mb: '60px',
                        py: '12px',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: 16,
                        borderRadius: '6px',
                        bgcolor: '#1890FF',
                        '&:hover': { bgcolor: '#1890FF', boxShadow: '0 8px 24px rgba(149,157,165,0.2)' },
                    }}
                >
                    Login now
                </Button>
            </Box>

            <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
                Dont have an account?{' '}
                <Link href="#" underline="none" sx={{ color: '#1890FF' }}>
                    Create New Account
                </Link>
            </Typography>
        </Box>
    );
}

export default memo(LoginForm);