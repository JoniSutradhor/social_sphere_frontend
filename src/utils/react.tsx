import { Children, type ComponentType, type ReactNode } from 'react';
import Suspense from 'components/Suspense';

export function SuspensedComponent<T = any>(Component: any): any {
    return (props: T): any => (
        <Suspense>
            <Component {...props} />
        </Suspense>
    );
}

export const getComponentName = (child: any) => {
    return (
        child?.name ||
        child?.render?.name ||
        child?.type?.name ||
        child?.type?.type?.name ||
        child?.type?.render?.name
    );
};

export function isValidChildElseThrow(
    children: ReactNode,
    allowedComponents: ComponentType<any> | ComponentType[]
) {
    const allowedChildArray = Array.isArray(allowedComponents)
        ? allowedComponents
        : [allowedComponents];
    const allowedChildNames = allowedChildArray.map((child) =>
        getComponentName(child)
    );

    if (!isValidChild(children, allowedComponents)) {
        throw new Error(
            `This Component only accepts ${allowedChildNames.join(
                ', '
            )} components as children. See error message for the error source.`
        );
    }
}

export function isValidChild(
    children: ReactNode,
    allowedComponents: ComponentType<any> | ComponentType[]
) {
    const allowedChildArray = Array.isArray(allowedComponents)
        ? allowedComponents
        : [allowedComponents];
    const allowedChildNames = allowedChildArray.map((child) =>
        getComponentName(child)
    );

    let validChildren = true;
    Children.map(children, (child: any) => {
        const childName = getComponentName(child);

        if (childName && !allowedChildNames.includes(childName)) {
            validChildren = false;
        }
    });

    return validChildren;
}
