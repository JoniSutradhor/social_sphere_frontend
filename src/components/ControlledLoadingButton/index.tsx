import { memo } from 'react';
import {
    Button,
    CircularProgress,
    Stack,
    type ButtonProps,
} from '@mui/material';

export interface ControlledLoadingButtonProps extends ButtonProps {
    loading?: boolean;
}

function ControlledLoadingButton({
    children,
    loading = false,
    disabled = false,
    sx,
    ...props
}: ControlledLoadingButtonProps) {
    return (
        <Button
            variant="contained"
            disabled={disabled || loading}
            sx={{
                py: '12px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 16,
                borderRadius: '6px',
                bgcolor: '#1890FF',
                '&:hover': {
                    bgcolor: '#1890FF',
                    boxShadow: '0 8px 24px rgba(149,157,165,0.2)',
                },
                '&.Mui-disabled': {
                    bgcolor: '#BFBFBF',
                    color: '#F5F5F5',
                    cursor: 'not-allowed',
                    pointerEvents: 'auto',
                },
                ...sx,
            }}
            {...props}
        >
            <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
            >


                {children}
                {loading && (
                    <CircularProgress
                        size={18}
                        thickness={5}
                        color="inherit"
                    />
                )}
            </Stack>
        </Button>
    );
}

export default memo(ControlledLoadingButton);