import Requester from 'utils/requester';

export type Visibility = 'public' | 'private';

export interface UserSummary {
    id: number;
    firstName: string;
    lastName: string;
    avatar?: string;
}

export interface LikeUser {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Reply {
    id: number;
    commentId: number;
    content: string;
    author: UserSummary;
    likesCount: number;
    likedByMe: boolean;
    createdAt: string;
}

export interface Comment {
    id: number;
    postId: number;
    content: string;
    author: UserSummary;
    likesCount: number;
    likedByMe: boolean;
    repliesCount: number;
    replies?: Reply[];
    createdAt: string;
}

export interface Post {
    id: number;
    content: string;
    image?: string;
    visibility: Visibility;

    author: UserSummary;

    likesCount: number;
    commentsCount: number;

    likedByMe: boolean;

    createdAt: string;

    comments?: Comment[];
}

export interface PaginatedPostsResponse {
    items: Post[];
    page: number;
    limit: number;
    hasNextPage: boolean;
}

export interface CreatePostRequest {
    content: string;
    image?: File;
    visibility: Visibility;
}

class SocialSphereApiPost {
    /**
     * Feed
     */
    static getFeed(page = 1, limit = 10) {
        return Requester.get<PaginatedPostsResponse>('/posts', {
            params: {
                page,
                limit,
                sort: 'newest',
            },
        });
    }

    /**
     * My Posts
     */
    static getMyPosts(page = 1, limit = 10) {
        return Requester.get<PaginatedPostsResponse>('/posts/me', {
            params: {
                page,
                limit,
            },
        });
    }

    /**
     * Single post
     */
    static getPost(postId: number) {
        return Requester.get<Post>(`/posts/${postId}`);
    }

    /**
     * Create post
     */
    static async createPost(data: CreatePostRequest) {
        const formData = new FormData();

        formData.append('content', data.content);
        formData.append('visibility', data.visibility);

        if (data.image) {
            formData.append('image', data.image);
        }

        return Requester.post<Post>('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    /**
     * Update post
     */
    static updatePost(
        postId: number,
        payload: {
            content: string;
            visibility: Visibility;
        }
    ) {
        return Requester.put<Post>(`/posts/${postId}`, payload);
    }

    /**
     * Delete post
     */
    static deletePost(postId: number) {
        return Requester.delete(`/posts/${postId}`);
    }

    /**
     * Like post
     */
    static likePost(postId: number) {
        return Requester.post(`/posts/${postId}/like`);
    }

    /**
     * Unlike post
     */
    static unlikePost(postId: number) {
        return Requester.delete(`/posts/${postId}/like`);
    }

    /**
     * Users who liked post
     */
    static getPostLikes(postId: number) {
        return Requester.get<LikeUser[]>(`/posts/${postId}/likes`);
    }

    /**
     * Create comment
     */
    static createComment(postId: number, content: string) {
        return Requester.post<Comment>(`/posts/${postId}/comments`, {
            content,
        });
    }

    /**
     * Like comment
     */
    static likeComment(commentId: number) {
        return Requester.post(`/comments/${commentId}/like`);
    }

    /**
     * Unlike comment
     */
    static unlikeComment(commentId: number) {
        return Requester.delete(`/comments/${commentId}/like`);
    }

    /**
     * Comment likes
     */
    static getCommentLikes(commentId: number) {
        return Requester.get<LikeUser[]>(`/comments/${commentId}/likes`);
    }

    /**
     * Reply
     */
    static createReply(commentId: number, content: string) {
        return Requester.post<Reply>(`/comments/${commentId}/replies`, {
            content,
        });
    }

    /**
     * Like reply
     */
    static likeReply(replyId: number) {
        return Requester.post(`/replies/${replyId}/like`);
    }

    /**
     * Unlike reply
     */
    static unlikeReply(replyId: number) {
        return Requester.delete(`/replies/${replyId}/like`);
    }

    /**
     * Reply likes
     */
    static getReplyLikes(replyId: number) {
        return Requester.get<LikeUser[]>(`/replies/${replyId}/likes`);
    }
}

export default SocialSphereApiPost;
