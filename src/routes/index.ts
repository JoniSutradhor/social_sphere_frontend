import { type JSX, type ReactNode } from 'react';
import { pathWithId } from 'utils/routes';

export interface routeShape {
    path: string;
    icon?: ReactNode | JSX.Element;
    title: string | ReactNode;
    keywords?: string;
    description?: string;
}

export class Route {
    id: symbol;

    path: string;

    icon: ReactNode;

    title: string;

    description: string;

    keywords: string;

    constructor({
        path = '',
        icon = null,
        title = '',
        description = '',
        keywords = '',
    }: routeShape & {
        title: string;
    }) {
        this.id = Symbol(path);
        this.path = path;
        this.icon = icon;
        this.title = title;
        this.description = description;
        this.keywords = keywords;
    }

    pathWithId(id: string | number) {
        return pathWithId(this.path, id);
    }

    toString() {
        return this.path;
    }
}

const routes = {
    notFound404: new Route({
        path: '/not-found',
        icon: null,
        title: 'global/error',
    }),
    home: new Route({
        path: '/',
        icon: null,
        title: 'home/feed',
    }),
    login: new Route({
        path: '/login',
        icon: null,
        title: 'auth/login',
    }),
    registration: new Route({
        path: '/registration',
        icon: null,
        title: 'auth/registration',
    }),
    socialSphereHome: new Route({
        path: '/feed',
        icon: null,
        title: 'home/feed',
    }),
};

export default routes;
