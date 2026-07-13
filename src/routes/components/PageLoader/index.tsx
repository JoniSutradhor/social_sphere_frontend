import { type ComponentType } from 'react';
import Suspense from 'components/Suspense';
import LoadingTopProgressBar from '../LoadingTopProgressBar/index';
import { Box } from '@mui/material';

const PageLoader =
    (Component: ComponentType<any>): ComponentType<any> =>
        (props: any) => (
            <Suspense
                fallback={
                    <Box>
                        <LoadingTopProgressBar />
                    </Box>
                }
            >
                <Component {...props} />
            </Suspense>
        );

export default PageLoader;
