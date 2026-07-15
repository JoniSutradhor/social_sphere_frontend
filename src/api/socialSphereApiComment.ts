import Requester from 'utils/requester';

export type ReactionType = 'like' | 'dislike';

export interface CommentAuthor {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
}

// A reply is just a Comment with parentId set — the backend has no separate reply model.
export interface Comment {
    _id: string;
    user: CommentAuthor;
    postId: string;
    parentId: string | null;
    rootId: string | null;
    content: string;
    imageUrl: string | null;
    likeCount: number;
    dislikeCount: number;
    replyCount: number;
    isEdited: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CursorPage<T> {
    data: T[];
    pagination: {
        nextCursor: string | null;
        hasMore: boolean;
    };
}

export interface ReactionResult {
    likeCount: number;
    dislikeCount: number;
    userReaction: ReactionType | null;
    postId: string;
}

export interface ListCommentsParams {
    cursor?: string;
    limit?: number;
    sortBy?: 'newest' | 'mostLiked';
}

export interface ListRepliesParams {
    cursor?: string;
    limit?: number;
}

class SocialSphereApiComment {
    /**
     * Top-level comments on a post (cursor-paginated)
     */
    static getComments(postId: string, params: ListCommentsParams = {}) {
        return Requester.get<CursorPage<Comment>>('/comments', {
            params: {
                postId,
                cursor: params.cursor,
                limit: params.limit,
                sortBy: params.sortBy,
            },
        });
    }

    /**
     * Replies to a comment (cursor-paginated, oldest first)
     */
    static getReplies(commentId: string, params: ListRepliesParams = {}) {
        return Requester.get<CursorPage<Comment>>(`/comments/${commentId}/replies`, {
            params: {
                cursor: params.cursor,
                limit: params.limit,
            },
        });
    }

    /**
     * Create a top-level comment on a post, optionally with an image attached
     */
    static createComment(content: string, postId: string, image?: File) {
        if (!image) {
            return Requester.post<Comment>('/comments', { content, postId });
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('postId', postId);
        formData.append('image', image);

        // Requester's axios instance defaults to Content-Type: application/json,
        // which makes axios JSON-stringify FormData instead of sending it as
        // multipart. Setting this (boundary-less) value is what tells axios to
        // let the browser fill in the real multipart boundary instead.
        return Requester.post<Comment>('/comments', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Reply to a comment — the backend derives postId from the parent comment
     */
    static createReply(commentId: string, content: string) {
        return Requester.post<Comment>(`/comments/${commentId}/reply`, { content });
    }

    /**
     * Edit a comment (author only) — pass `image` to replace the attached
     * image, or `removeImage` to clear it without replacing
     */
    static updateComment(
        commentId: string,
        content: string,
        options: { image?: File; removeImage?: boolean } = {}
    ) {
        if (!options.image && !options.removeImage) {
            return Requester.put<Comment>(`/comments/${commentId}`, { content });
        }

        const formData = new FormData();
        formData.append('content', content);
        if (options.image) formData.append('image', options.image);
        if (options.removeImage) formData.append('removeImage', 'true');

        return Requester.put<Comment>(`/comments/${commentId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Delete a comment (author only)
     */
    static deleteComment(commentId: string) {
        return Requester.delete<{ message: string }>(`/comments/${commentId}`);
    }

    /**
     * Toggle the current user's like on a comment (liking again removes it,
     * liking after a dislike swaps it)
     */
    static likeComment(commentId: string) {
        return Requester.post<ReactionResult>(`/comments/${commentId}/like`);
    }

    /**
     * Toggle the current user's dislike on a comment
     */
    static dislikeComment(commentId: string) {
        return Requester.post<ReactionResult>(`/comments/${commentId}/dislike`);
    }
}

export default SocialSphereApiComment;
