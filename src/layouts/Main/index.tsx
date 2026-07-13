import { Link as RouterLink, Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import { type ReactNode } from 'react';
import ErrorBoundary from 'components/ErrorBoundary';


export interface MainLayoutProps {
    children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        py: '80px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 8,
                        }}
                    >
                        <RouterLink to="/">
                            Logo
                        </RouterLink>
                    </Box>
                    <ErrorBoundary>
                        <Outlet />
                        {children}
                    </ErrorBoundary>
                </Container>
            </Box>
        </>
    );
};

export default MainLayout;
