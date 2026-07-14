import { type FC, useState } from "react";
import CommentReactionBadge from "../CommentReactionBadge";
import CommentComposer from "../CommentComposer";
import type { Comment } from "components/FeedPost/types";

export interface CommentItemProps {
    comment: Comment;
    currentUserAvatar: string;
    onLike?: () => void;
    onShare?: () => void;
    onReplySubmit?: (commentId: string, text: string) => void;
}

/**
 * CommentItem
 * Renders one comment (avatar, name, text, reaction total, and the
 * like/reply/share/timestamp row), plus a collapsible reply composer.
 */
const CommentItem: FC<CommentItemProps> = ({ comment, currentUserAvatar, onLike, onShare, onReplySubmit }) => {
    const [replying, setReplying] = useState(false);
    const { id, authorName, authorAvatar, text, reactionTotal, timeAgo, profileHref = "profile.html" } = comment;

    return (
        <div className="_comment_main">
            <div className="_comment_image">
                <a href={profileHref} className="_comment_image_link">
                    <img src={authorAvatar} alt={authorName} className="_comment_img1" />
                </a>
            </div>
            <div className="_comment_area">
                <div className="_comment_details">
                    <div className="_comment_details_top">
                        <div className="_comment_name">
                            <a href={profileHref}>
                                <h4 className="_comment_name_title">{authorName}</h4>
                            </a>
                        </div>
                    </div>

                    <div className="_comment_status">
                        <p className="_comment_status_text">
                            <span>{text}</span>
                        </p>
                    </div>

                    <CommentReactionBadge total={reactionTotal} />

                    <div className="_comment_reply">
                        <div className="_comment_reply_num">
                            <ul className="_comment_reply_list">
                                <li>
                                    <span onClick={onLike} role="button" tabIndex={0} style={{ cursor: "pointer" }}>
                                        Like.
                                    </span>
                                </li>
                                <li>
                                    <span onClick={() => setReplying((r) => !r)} role="button" tabIndex={0} style={{ cursor: "pointer" }}>
                                        Reply.
                                    </span>
                                </li>
                                <li>
                                    <span onClick={onShare} role="button" tabIndex={0} style={{ cursor: "pointer" }}>
                                        Share
                                    </span>
                                </li>
                                <li>
                                    <span className="_time_link">{timeAgo}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {replying && (
                    <CommentComposer
                        avatarSrc={currentUserAvatar}
                        placeholder="Write a reply"
                        textareaId={`reply-${id}`}
                        onSubmit={(replyText) => {
                            onReplySubmit?.(id, replyText);
                            setReplying(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentItem;