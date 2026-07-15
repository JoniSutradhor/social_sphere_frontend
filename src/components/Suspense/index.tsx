import React, { type ReactNode } from 'react';

export interface SuspenseProps extends React.SuspenseProps {
    children: ReactNode;
}

const Suspense = ({ children, ...props }: SuspenseProps) => {
    return (
        <React.Suspense fallback={<></>} {...props}>
            {children}
        </React.Suspense>
    );
};

export default Suspense;
