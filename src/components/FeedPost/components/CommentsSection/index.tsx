import { type FC, useState } from "react";
import CommentComposer from "../CommentComposer";
import CommentItem from "../CommentItem";
import type { Comment } from "components/FeedPost/types";

export interface CommentsSectionProps {
    currentUserAvatar: string;
    comments?: Comment[];
    previousCommentCount?: number;
    onNewComment?: (text: string) => void;
    onLoadPrevious?: () => void;
    onLike?: (commentId: string) => void;
    onShare?: (commentId: string) => void;
    onReply?: (commentId: string, text: string) => void;
}

/**
 * CommentsSection
 * Composes the "write a comment" box, the "view N previous comments"
 * expander, and the visible list of comments underneath a post.
 */
const CommentsSection: FC<CommentsSectionProps> = ({
    currentUserAvatar,
    comments = [],
    previousCommentCount = 0,
    onNewComment,
    onLoadPrevious,
    onLike,
    onShare,
    onReply,
}) => {
    const [previousLoaded, setPreviousLoaded] = useState(previousCommentCount === 0);

    const handleLoadPrevious = () => {
        setPreviousLoaded(true);
        onLoadPrevious?.();
    };

    return (
        <>
            <div className="_feed_inner_timeline_cooment_area">
                <CommentComposer
                    avatarSrc={currentUserAvatar}
                    placeholder="Write a comment"
                    textareaId="new-comment"
                    onSubmit={onNewComment}
                />
            </div>

            <div className="_timline_comment_main">
                {!previousLoaded && (
                    <div className="_previous_comment">
                        <button type="button" className="_previous_comment_txt" onClick={handleLoadPrevious}>
                            View {previousCommentCount} previous comments
                        </button>
                    </div>
                )}

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
            </div>
        </>
    );
};

export default CommentsSection;