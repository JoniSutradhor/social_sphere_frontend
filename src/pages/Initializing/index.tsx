import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CircularProgress, Container } from '@mui/material';

const Initializing = () => {

    useEffect(() => {
        const noJsLoader = document.getElementById('no-js-loader');
        if (noJsLoader) {
            noJsLoader?.parentNode?.removeChild(noJsLoader);
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Social Sphere</title>
            </Helmet>
            <Container
                maxWidth="md"
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    background: '#f8f8f8',
                }}
            >
                <CircularProgress />
            </Container>
        </>
    );
};

export default Initializing;
