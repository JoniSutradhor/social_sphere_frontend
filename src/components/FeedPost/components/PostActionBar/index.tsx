import { CommentIcon, HahaReactionIcon, ShareIcon } from "components/FeedPost/icons";
import { type FC, type ReactNode } from "react";

export interface PostActionBarProps {
    activeReaction?: string | null;
    reactionIcon?: ReactNode;
    reactionLabel?: string;
    onReact?: () => void;
    onComment?: () => void;
    onShare?: () => void;
}

const PostActionBar: FC<PostActionBarProps> = ({
    activeReaction = null,
    reactionIcon = <HahaReactionIcon />,
    reactionLabel = "Haha",
    onReact,
    onComment,
    onShare,
}) => (
    <div className="_feed_inner_timeline_reaction">
        <button
            type="button"
            className={`_feed_inner_timeline_reaction_emoji _feed_reaction${activeReaction ? " _feed_reaction_active" : ""}`}
            onClick={onReact}
        >
            <span className="_feed_inner_timeline_reaction_link">
                <span>
                    {reactionIcon}
                    {reactionLabel}
                </span>
            </span>
        </button>

        <button type="button" className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={onComment}>
            <span className="_feed_inner_timeline_reaction_link">
                <span>
                    <CommentIcon />
                    Comment
                </span>
            </span>
        </button>

        <button type="button" className="_feed_inner_timeline_reaction_share _feed_reaction" onClick={onShare}>
            <span className="_feed_inner_timeline_reaction_link">
                <span>
                    <ShareIcon />
                    Share
                </span>
            </span>
        </button>
    </div>
);

export default PostActionBar;