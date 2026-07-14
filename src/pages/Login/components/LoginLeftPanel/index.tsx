import { memo } from 'react';
import { Box } from '@mui/material';
import { assetUrl } from 'utils/url';

function LoginLeftPanel() {
    return (
        <Box
            component="img"
            src={assetUrl('/auth/login.png')}
            alt="Login"
            sx={{ maxWidth: 633, width: '100%' }}
        />
    );
}

export default memo(LoginLeftPanel);