import { Box, Grid, type GridProps } from '@mui/material';
import { type ReactNode } from 'react';
import { assetUrl } from 'utils/url';

export interface TwoPaneLayoutProps extends GridProps {
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    leftPanelProps?: GridProps;
    rightPanelProps?: GridProps;
    showBackgroundShapes?: boolean;
}

const TwoPaneLayout = ({
    leftPanel,
    rightPanel,
    leftPanelProps,
    rightPanelProps,
    showBackgroundShapes = false,
    ...props
}: TwoPaneLayoutProps) => {
    const { sx: leftPanelSx, ...restLeftPanelProps } = leftPanelProps ?? {};
    const { sx: rightPanelSx, ...restRightPanelProps } = rightPanelProps ?? {};

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {showBackgroundShapes && (
                <>
                    <Box
                        component="img"
                        src={assetUrl('/auth/shape1.svg')}
                        alt=""
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: -1,
                            pointerEvents: 'none',
                            display: { xs: 'none', lg: 'block' },
                        }}
                    />
                    <Box
                        component="img"
                        src="/assets/images/shape2.svg"
                        alt=""
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: '20px',
                            zIndex: -1,
                            pointerEvents: 'none',
                            display: { xs: 'none', lg: 'block' },
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            zIndex: -1,
                            pointerEvents: 'none',
                            display: { xs: 'none', lg: 'block' },
                            right: '327px',
                            '@media (min-width:1200px) and (max-width:1499px)': { right: 0 },
                            '@media (min-width:1500px) and (max-width:1700px)': { right: '226px' },
                        }}
                    >
                        <Box
                            component="img"
                            src={assetUrl('/auth/shape3.svg')}
                            alt=""
                            sx={{
                                display: 'block',
                                width: { xs: 'auto', lg: 'auto' },
                                '@media (min-width:1200px) and (max-width:1499px)': { width: '494px' },
                                '@media (min-width:1500px) and (max-width:1700px)': { width: '400px' },
                            }}
                        />
                    </Box>
                </>
            )}
            <Grid
                container
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100vh',
                    overflow: { xs: 'auto', lg: 'hidden' },
                }}
                {...props}
            >
                <Grid
                    size={{ xs: 12, lg: 5 }}
                    sx={{
                        display: 'flex',
                        px: 2,
                        overflowY: 'auto',
                        py: { xs: 4, sm: 10 },
                        order: { xs: 2, lg: 1 },
                        height: { xs: 'auto', lg: '100vh' },
                        ...leftPanelSx,
                    }}
                    {...restLeftPanelProps}
                >
                    {leftPanel}
                </Grid>
                <Grid
                    size={{ xs: 12, lg: 7 }}
                    sx={{
                        display: 'flex',
                        py: 5,
                        overflowY: 'auto',
                        px: { xs: 2, sm: 5 },
                        order: { xs: 1, lg: 2 },
                        height: { xs: 'auto', lg: '100vh' },
                        ...rightPanelSx,
                    }}
                    {...restRightPanelProps}
                >
                    {rightPanel}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TwoPaneLayout;