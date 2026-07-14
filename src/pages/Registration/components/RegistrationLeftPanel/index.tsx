import { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import { assetUrl } from 'utils/url';

function RegistrationLeftPanel() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                margin: 'auto',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                component="img"
                src={assetUrl(
                    isDark ? '/auth/registration1.png' : '/auth/registration.png'
                )}
                alt="Registration"
                sx={{ maxWidth: '100%' }}
            />
        </Box>
    );
}

export default memo(RegistrationLeftPanel);