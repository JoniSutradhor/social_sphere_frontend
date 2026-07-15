import { type FC } from "react";
import type { MenuItem, Post } from "./types";
import PostAuthorHeader from "./components/PostAuthorHeader";
import PostContent from "./components/PostContent";
import ReactionSummary from "./components/ReactionSummary";
import PostActionBar from "./components/PostActionBar";
import CommentsSection from "./components/CommentsSection";

export interface FeedPostProps {
    post: Post;
    currentUserAvatar: string;
    menuItems?: MenuItem[];
    newCommentTextareaId?: string;
    activeReaction?: string | null;
    onMenuSelect?: (key: string) => void;
    onReact?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onNewComment?: (text: string) => void;
    onLoadPreviousComments?: () => void | Promise<void>;
    onLikeComment?: (commentId: string) => void;
    onShareComment?: (commentId: string) => void;
    onReplyComment?: (commentId: string, text: string) => void;
    onLikeReply?: (replyId: string) => void;
}

/**
 * FeedPost
 * The full post card: header, content, reaction summary, action bar,
 * and comments. Every piece above is independently reusable/exported,
 * so consumers can also build custom layouts (e.g. a compact preview
 * card) from the same parts.
 */
const FeedPost: FC<FeedPostProps> = ({
    post,
    currentUserAvatar,
    menuItems,
    newCommentTextareaId,
    activeReaction,
    onMenuSelect,
    onReact,
    onComment,
    onShare,
    onNewComment,
    onLoadPreviousComments,
    onLikeComment,
    onShareComment,
    onReplyComment,
    onLikeReply,
}) => {
    const {
        author,
        timeAgo,
        visibility,
        title,
        image,
        reactorAvatars,
        extraReactorCount,
        commentCount,
        shareCount,
        hasMoreComments,
        comments,
    } = post;

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <PostAuthorHeader
                    avatarSrc={author.avatar}
                    authorName={author.name}
                    timeAgo={timeAgo}
                    visibility={visibility}
                    menuItems={menuItems}
                    onMenuSelect={onMenuSelect}
                />
                <PostContent title={title} imageSrc={image} />
            </div>

            <ReactionSummary
                reactorAvatars={reactorAvatars}
                extraReactorCount={extraReactorCount}
                commentCount={commentCount ?? comments?.length ?? 0}
                shareCount={shareCount}
            />

            <PostActionBar activeReaction={activeReaction} onReact={onReact} onComment={onComment} onShare={onShare} />

            <CommentsSection
                currentUserAvatar={currentUserAvatar}
                comments={comments}
                hasMoreComments={hasMoreComments}
                newCommentTextareaId={newCommentTextareaId}
                onNewComment={onNewComment}
                onLoadPrevious={onLoadPreviousComments}
                onLike={onLikeComment}
                onShare={onShareComment}
                onReply={onReplyComment}
                onLikeReply={onLikeReply}
            />
        </div>
    );
};

export default FeedPost;
