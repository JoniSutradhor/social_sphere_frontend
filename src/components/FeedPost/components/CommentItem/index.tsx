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
    onLikeReply?: (replyId: string) => void;
    onShowLikes?: () => void;
    onShowReplyLikes?: (replyId: string) => void;
}

const CommentItem: FC<CommentItemProps> = ({
    comment,
    currentUserAvatar,
    onLike,
    onShare,
    onReplySubmit,
    onLikeReply,
    onShowLikes,
    onShowReplyLikes,
}) => {
    const [replying, setReplying] = useState(false);
    const { id, authorName, authorAvatar, text, reactionTotal, liked, timeAgo, profileHref = "profile.html", replies } = comment;

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

                    <CommentReactionBadge total={reactionTotal} onShowLikes={onShowLikes} />

                    <div className="_comment_reply">
                        <div className="_comment_reply_num">
                            <ul className="_comment_reply_list">
                                <li>
                                    <span
                                        onClick={onLike}
                                        role="button"
                                        tabIndex={0}
                                        style={{ cursor: "pointer", color: liked ? "#1890FF" : undefined, fontWeight: liked ? 600 : undefined }}
                                    >
                                        {liked ? "Liked." : "Like."}
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

                {replies && replies.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                        {replies.map((reply) => (
                            <div className="_comment_main" key={reply.id}>
                                <div className="_comment_image">
                                    <a href={reply.profileHref ?? "profile.html"} className="_comment_image_link">
                                        <img src={reply.authorAvatar} alt={reply.authorName} className="_comment_img1" />
                                    </a>
                                </div>
                                <div className="_comment_area">
                                    <div className="_comment_details">
                                        <div className="_comment_details_top">
                                            <div className="_comment_name">
                                                <a href={reply.profileHref ?? "profile.html"}>
                                                    <h4 className="_comment_name_title">{reply.authorName}</h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="_comment_status">
                                            <p className="_comment_status_text">
                                                <span>{reply.text}</span>
                                            </p>
                                        </div>

                                        <CommentReactionBadge
                                            total={reply.reactionTotal}
                                            onShowLikes={() => onShowReplyLikes?.(reply.id)}
                                        />

                                        <div className="_comment_reply">
                                            <div className="_comment_reply_num">
                                                <ul className="_comment_reply_list">
                                                    <li>
                                                        <span
                                                            onClick={() => onLikeReply?.(reply.id)}
                                                            role="button"
                                                            tabIndex={0}
                                                            style={{
                                                                cursor: "pointer",
                                                                color: reply.liked ? "#1890FF" : undefined,
                                                                fontWeight: reply.liked ? 600 : undefined,
                                                            }}
                                                        >
                                                            {reply.liked ? "Liked." : "Like."}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="_time_link">{reply.timeAgo}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
