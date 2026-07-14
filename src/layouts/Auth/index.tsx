import { type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import routes from 'routes/index';
import { assetUrl } from 'utils/url';
import LoginLeftPanel from 'pages/Login/components/LoginLeftPanel';
import RegistrationLeftPanel from 'pages/Registration/components/RegistrationLeftPanel';
import { AuthLayoutPageEnum } from './utils';

export interface AuthLayoutProps {
    page: AuthLayoutPageEnum;
    children: ReactNode;
}

const getLeftPanelPage = (page: AuthLayoutPageEnum): ReactNode => {
    switch (page) {
        case AuthLayoutPageEnum.LOGIN:
            return <LoginLeftPanel />;
        case AuthLayoutPageEnum.REGISTRATION:
            return <RegistrationLeftPanel />;
        default:
            return null;
    }
};

function Auth({ page, children }: AuthLayoutProps) {
    const leftPanel = getLeftPanelPage(page);

    return (
        <Box
            sx={{
                py: { xs: 6, lg: '100px' },
                bgcolor: '#F0F2F5',
                position: 'relative',
                zIndex: 1,
                minHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Decorative shapes - behind everything, z-index -1 */}
            <Box
                component="img"
                src={assetUrl('/auth/shape1.svg')}
                alt=""
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    display: { xs: 'none', lg: 'block' },
                }}
            />
            <Box
                component="img"
                src={assetUrl('/auth/shape2.svg')}
                alt=""
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    zIndex: -1,
                    display: { xs: 'none', lg: 'block' },
                }}
            />
            <Box
                component="img"
                src={assetUrl('/auth/shape3.svg')}
                alt=""
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: { lg: 494, xl: 327 },
                    zIndex: -1,
                    display: { xs: 'none', lg: 'block' },
                }}
            />

            <Box sx={{ maxWidth: 1320, mx: 'auto', px: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={4}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Box sx={{ display: 'flex' }}>{leftPanel}</Box>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Box
                            sx={{
                                bgcolor: '#FFFFFF',
                                borderRadius: '6px',
                                p: { xs: 3, lg: '48px' },
                                textAlign: 'center',
                            }}
                        >
                            <Box component="a" href={routes.home.path} target="_self">
                                <Box
                                    component="img"
                                    src={assetUrl('/logo.svg')}
                                    alt="Social Sphere"
                                    sx={{ mx: 'auto', maxWidth: 161, display: 'block', mb: '28px' }}
                                />
                            </Box>
                            {children}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Auth;