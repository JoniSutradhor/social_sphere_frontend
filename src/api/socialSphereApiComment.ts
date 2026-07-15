import Requester from 'utils/requester';

export type ReactionType = 'like' | 'dislike';

export interface CommentAuthor {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
}

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
    userReaction: ReactionType | null;
    isEdited: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Reactor {
    user: CommentAuthor;
    reactedAt: string;
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

    static getReplies(commentId: string, params: ListRepliesParams = {}) {
        return Requester.get<CursorPage<Comment>>(`/comments/${commentId}/replies`, {
            params: {
                cursor: params.cursor,
                limit: params.limit,
            },
        });
    }

    static createComment(content: string, postId: string, image?: File) {
        if (!image) {
            return Requester.post<Comment>('/comments', { content, postId });
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('postId', postId);
        formData.append('image', image);

        return Requester.post<Comment>('/comments', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static createReply(commentId: string, content: string) {
        return Requester.post<Comment>(`/comments/${commentId}/reply`, { content });
    }

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

    static deleteComment(commentId: string) {
        return Requester.delete<{ message: string }>(`/comments/${commentId}`);
    }

    static likeComment(commentId: string) {
        return Requester.post<ReactionResult>(`/comments/${commentId}/like`);
    }

    static dislikeComment(commentId: string) {
        return Requester.post<ReactionResult>(`/comments/${commentId}/dislike`);
    }

    static getCommentLikes(commentId: string, params: { cursor?: string; limit?: number } = {}) {
        return Requester.get<CursorPage<Reactor>>(`/comments/${commentId}/likes`, {
            params: {
                cursor: params.cursor,
                limit: params.limit,
            },
        });
    }
}

export default SocialSphereApiComment;
