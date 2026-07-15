import Requester from 'utils/requester';
import type { CommentAuthor, CursorPage, ReactionResult } from 'api/socialSphereApiComment';

export interface Post {
    _id: string;
    user: CommentAuthor;
    content: string;
    imageUrl: string | null;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
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
    /**
     * Feed (cursor-paginated)
     */
    static getFeed(params: ListPostsParams = {}) {
        return Requester.get<CursorPage<Post>>('/posts', {
            params: {
                cursor: params.cursor,
                limit: params.limit,
                sortBy: params.sortBy,
            },
        });
    }

    /**
     * Single post
     */
    static getPost(postId: string) {
        return Requester.get<Post>(`/posts/${postId}`);
    }

    /**
     * Create a post, optionally with an image attached
     */
    static createPost(content: string, image?: File) {
        if (!image) {
            return Requester.post<Post>('/posts', { content });
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('image', image);

        // See socialSphereApiComment.ts for why the Content-Type must be set
        // explicitly here — otherwise axios JSON-stringifies the FormData.
        return Requester.post<Post>('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Edit a post (author only) — pass `image` to replace the attached
     * image, or `removeImage` to clear it without replacing
     */
    static updatePost(
        postId: string,
        content: string,
        options: { image?: File; removeImage?: boolean } = {}
    ) {
        if (!options.image && !options.removeImage) {
            return Requester.put<Post>(`/posts/${postId}`, { content });
        }

        const formData = new FormData();
        formData.append('content', content);
        if (options.image) formData.append('image', options.image);
        if (options.removeImage) formData.append('removeImage', 'true');

        return Requester.put<Post>(`/posts/${postId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Delete a post (author only)
     */
    static deletePost(postId: string) {
        return Requester.delete<{ message: string }>(`/posts/${postId}`);
    }

    /**
     * Toggle the current user's like on a post (liking again removes it,
     * liking after a dislike swaps it)
     */
    static likePost(postId: string) {
        return Requester.post<ReactionResult>(`/posts/${postId}/like`);
    }

    /**
     * Toggle the current user's dislike on a post
     */
    static dislikePost(postId: string) {
        return Requester.post<ReactionResult>(`/posts/${postId}/dislike`);
    }
}

export default SocialSphereApiPost;
