import { HeartIcon, ThumbsUpIcon } from "components/FeedPost/icons";
import { type FC } from "react";

export interface CommentReactionBadgeProps {
    total?: number;
}

/**
 * CommentReactionBadge
 * The little thumbs-up + heart icon cluster with a total reaction count,
 * shown on the right side of a comment.
 */
const CommentReactionBadge: FC<CommentReactionBadgeProps> = ({ total = 0 }) => (
    <div className="_total_reactions">
        <div className="_total_react">
            <span className="_reaction_like">
                <ThumbsUpIcon />
            </span>
            <span className="_reaction_heart">
                <HeartIcon />
            </span>
        </div>
        <span className="_total">{total}</span>
    </div>
);

export default CommentReactionBadge;