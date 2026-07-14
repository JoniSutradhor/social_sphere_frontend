import { type FC, useState } from "react";
import CommentComposer from "../CommentComposer";
import CommentItem from "../CommentItem";
import type { Comment } from "components/FeedPost/types";

export interface CommentsSectionProps {
    currentUserAvatar: string;
    comments?: Comment[];
    hasMoreComments?: boolean;
    newCommentTextareaId?: string;
    onNewComment?: (text: string) => void;
    onLoadPrevious?: () => void | Promise<void>;
    onLike?: (commentId: string) => void;
    onShare?: (commentId: string) => void;
    onReply?: (commentId: string, text: string) => void;
}

/**
 * CommentsSection
 * Composes the "write a comment" box, the "load more comments"
 * expander, and the visible list of comments underneath a post.
 */
const CommentsSection: FC<CommentsSectionProps> = ({
    currentUserAvatar,
    comments = [],
    hasMoreComments = false,
    newCommentTextareaId = "new-comment",
    onNewComment,
    onLoadPrevious,
    onLike,
    onShare,
    onReply,
}) => {
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadPrevious = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        try {
            await onLoadPrevious?.();
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <>
            <div className="_feed_inner_timeline_cooment_area">
                <CommentComposer
                    avatarSrc={currentUserAvatar}
                    placeholder="Write a comment"
                    textareaId={newCommentTextareaId}
                    onSubmit={onNewComment}
                />
            </div>

            <div className="_timline_comment_main">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        currentUserAvatar={currentUserAvatar}
                        onLike={() => onLike?.(comment.id)}
                        onShare={() => onShare?.(comment.id)}
                        onReplySubmit={onReply}
                    />
                ))}

                {hasMoreComments && (
                    <div className="_previous_comment">
                        <button type="button" className="_previous_comment_txt" onClick={handleLoadPrevious} disabled={loadingMore}>
                            {loadingMore ? "Loading..." : "Load more comments"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentsSection;
