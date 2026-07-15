import type { ReactNode } from 'react';

export interface MenuItem {
    key: string;
    label: string;
    icon: ReactNode;
    onClick?: () => void;
}

export interface Comment {
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    reactionTotal: number;
    liked?: boolean;
    timeAgo: string;
    profileHref?: string;
    replies?: Comment[];
}

export interface PostAuthor {
    name: string;
    avatar: string;
    href?: string;
}

export interface Post {
    author: PostAuthor;
    timeAgo: string;
    visibility?: string;
    title?: string;
    image?: string;
    reactorAvatars?: string[];
    extraReactorCount?: number;
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    hasMoreComments?: boolean;
    comments: Comment[];
}
