import Requester from 'utils/requester';
import type { CommentAuthor, CursorPage, ReactionResult, ReactionType, Reactor } from 'api/socialSphereApiComment';

export type PostVisibility = 'public' | 'private';

export interface Post {
    _id: string;
    user: CommentAuthor;
    content: string;
    imageUrl: string | null;
    visibility: PostVisibility;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    userReaction: ReactionType | null;
    isEdited: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ListPostsParams {
    cursor?: string;
    limit?: number;
    sortBy?: 'newest' | 'mostLiked';
}

class SocialSphereApiPost {
    static getFeed(params: ListPostsParams = {}) {
        return Requester.get<CursorPage<Post>>('/posts', {
            params: {
                cursor: params.cursor,
                limit: params.limit,
                sortBy: params.sortBy,
            },
        });
    }

    static getPost(postId: string) {
        return Requester.get<Post>(`/posts/${postId}`);
    }

    static createPost(content: string, image?: File, visibility?: PostVisibility) {
        if (!image) {
            return Requester.post<Post & { message: string }>('/posts', { content, visibility });
        }

        const formData = new FormData();
        formData.append('content', content);
        if (visibility) formData.append('visibility', visibility);
        formData.append('image', image);

        return Requester.post<Post & { message: string }>('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static updatePost(
        postId: string,
        content: string,
        options: { image?: File; removeImage?: boolean; visibility?: PostVisibility } = {}
    ) {
        if (!options.image && !options.removeImage) {
            return Requester.put<Post>(`/posts/${postId}`, { content, visibility: options.visibility });
        }

        const formData = new FormData();
        formData.append('content', content);
        if (options.image) formData.append('image', options.image);
        if (options.removeImage) formData.append('removeImage', 'true');
        if (options.visibility) formData.append('visibility', options.visibility);

        return Requester.put<Post>(`/posts/${postId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static deletePost(postId: string) {
        return Requester.delete<{ message: string }>(`/posts/${postId}`);
    }

    static likePost(postId: string) {
        return Requester.post<ReactionResult>(`/posts/${postId}/like`);
    }

    static dislikePost(postId: string) {
        return Requester.post<ReactionResult>(`/posts/${postId}/dislike`);
    }

    static getPostLikes(postId: string, params: { cursor?: string; limit?: number } = {}) {
        return Requester.get<CursorPage<Reactor>>(`/posts/${postId}/likes`, {
            params: {
                cursor: params.cursor,
                limit: params.limit,
            },
        });
    }
}

export default SocialSphereApiPost;
