import { HeartIcon, ThumbsUpIcon } from "components/FeedPost/icons";
import { type FC } from "react";

export interface CommentReactionBadgeProps {
    total?: number;
    onShowLikes?: () => void;
}

const CommentReactionBadge: FC<CommentReactionBadgeProps> = ({ total = 0, onShowLikes }) => (
    <div className="_total_reactions">
        <div className="_total_react">
            <span className="_reaction_like">
                <ThumbsUpIcon />
            </span>
            <span className="_reaction_heart">
                <HeartIcon />
            </span>
        </div>
        <span
            className="_total"
            onClick={total > 0 ? onShowLikes : undefined}
            role={total > 0 && onShowLikes ? "button" : undefined}
            tabIndex={total > 0 && onShowLikes ? 0 : undefined}
            style={total > 0 && onShowLikes ? { cursor: "pointer" } : undefined}
        >
            {total}
        </span>
    </div>
);

export default CommentReactionBadge;