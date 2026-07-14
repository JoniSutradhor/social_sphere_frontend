import FeedPost from "components/FeedPost";
import type { Comment as UIComment, Post as UIPost } from "components/FeedPost/types";
import { useEffect, useState } from "react";
import postImg from "staticImages/post_img.png";
import timeLineImg from "staticImages/timeline_img.png";
import reactImg1 from "staticImages/react_img1.png";
import reactImg2 from "staticImages/react_img2.png";
import reactImg3 from "staticImages/react_img3.png";
import reactImg4 from "staticImages/react_img4.png";
import reactImg5 from "staticImages/react_img5.png";
import txtImg from "staticImages/txt_img.png";
import commentImg from "staticImages/comment_img.png";
import defaultAvatar from "staticImages/profile.png";
import CreateNewPost from "components/CreatePost";
import FeedLayout from "layouts/Feed";
import SocialSphereApiComment, {
    type Comment as ApiComment,
    type ReactionType,
} from "api/socialSphereApiComment";
import { toast } from "core_components/Toaster";
import { formatRelativeTime } from "utils/formatRelativeTime";

// This backend only has a flat "comments on a page" resource, no real post
// entity — so every top-level comment on pageId "main" is treated as its own
// post in the feed, and that comment's replies become the post's comments.
const PAGE_ID = "main";
const POSTS_PAGE_SIZE = 5;
const CURRENT_USER_AVATAR = commentImg;

interface FeedPostEntry {
    id: string;
    authorName: string;
    authorAvatar: string;
    timeAgo: string;
    title?: string;
    image?: string;
    reactorAvatars?: string[];
    extraReactorCount?: number;
    shareCount?: number;
    likeCount: number;
    userReaction: ReactionType | null;
    replyCount: number;
    replies: UIComment[];
}

// One static example so the feed shows what a richer post (image, multiple
// reactions) looks like — everything else on the page is loaded for real.
const STATIC_EXAMPLE_POST: FeedPostEntry = {
    id: "static-example",
    authorName: "Karim Saif",
    authorAvatar: postImg,
    timeAgo: "5 minute",
    title: "-Healthy Tracking App",
    image: timeLineImg,
    reactorAvatars: [reactImg1, reactImg2, reactImg3, reactImg4, reactImg5],
    extraReactorCount: 9,
    shareCount: 122,
    likeCount: 0,
    userReaction: null,
    replyCount: 1,
    replies: [
        {
            id: "static-comment-1",
            authorName: "Radovan SkillArena",
            authorAvatar: txtImg,
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            reactionTotal: 198,
            timeAgo: "21m",
        },
    ],
};

const mapReply = (comment: ApiComment): UIComment => {
    const fullName = [comment.user.firstName, comment.user.lastName].filter(Boolean).join(" ");

    return {
        id: comment._id,
        authorName: fullName || "Anonymous",
        authorAvatar: comment.user.avatar || defaultAvatar,
        text: comment.content,
        reactionTotal: comment.likeCount,
        timeAgo: formatRelativeTime(comment.createdAt),
    };
};

const mapPost = (comment: ApiComment): FeedPostEntry => {
    const fullName = [comment.user.firstName, comment.user.lastName].filter(Boolean).join(" ");

    return {
        id: comment._id,
        authorName: fullName || "Anonymous",
        authorAvatar: comment.user.avatar || defaultAvatar,
        timeAgo: formatRelativeTime(comment.createdAt),
        title: comment.content,
        likeCount: comment.likeCount,
        userReaction: null,
        replyCount: comment.replyCount,
        replies: [],
    };
};

const getApiErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

// Eagerly fill in each post's replies (rather than a click-to-reveal gate) so
// the comment thread is just there when the feed loads.
const withReplies = async (posts: FeedPostEntry[]): Promise<FeedPostEntry[]> =>
    Promise.all(
        posts.map(async (post) => {
            if (post.replyCount === 0) return post;
            try {
                const { data } = await SocialSphereApiComment.getReplies(post.id);
                return { ...post, replies: data.map(mapReply) };
            } catch {
                return post;
            }
        })
    );

function FeedPostWrapper() {
    const [posts, setPosts] = useState<FeedPostEntry[]>([]);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState(false);

    useEffect(() => {
        let cancelled = false;

        SocialSphereApiComment.getComments(PAGE_ID, { limit: POSTS_PAGE_SIZE })
            .then(async ({ data, pagination }) => {
                if (cancelled) return;
                const loaded = await withReplies(data.map(mapPost));
                if (cancelled) return;
                setPosts(loaded);
                setNextCursor(pagination.nextCursor);
                setHasMorePosts(pagination.hasMore);
            })
            .catch((err) => {
                if (!cancelled) toast.error(getApiErrorMessage(err, "Failed to load posts"));
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCreatePost = async (text: string) => {
        try {
            const created = await SocialSphereApiComment.createComment(text, PAGE_ID);
            setPosts((prev) => [mapPost(created), ...prev]);
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to create post"));
        }
    };

    const handleLoadMorePosts = async () => {
        if (!hasMorePosts || !nextCursor) return;

        try {
            const { data, pagination } = await SocialSphereApiComment.getComments(PAGE_ID, {
                cursor: nextCursor,
                limit: POSTS_PAGE_SIZE,
            });
            const loaded = await withReplies(data.map(mapPost));
            setPosts((prev) => [...prev, ...loaded]);
            setNextCursor(pagination.nextCursor);
            setHasMorePosts(pagination.hasMore);
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to load more posts"));
        }
    };

    const handleReact = async (postId: string) => {
        try {
            const { likeCount, userReaction } = await SocialSphereApiComment.likeComment(postId);
            setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likeCount, userReaction } : p)));
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to react to post"));
        }
    };

    const handleNewComment = async (postId: string, text: string) => {
        try {
            const created = await SocialSphereApiComment.createReply(postId, text);
            const reply = mapReply(created);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId ? { ...p, replyCount: p.replyCount + 1, replies: [...p.replies, reply] } : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to post comment"));
        }
    };

    const handleLikeReply = async (postId: string, replyId: string) => {
        try {
            const { likeCount } = await SocialSphereApiComment.likeComment(replyId);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? { ...p, replies: p.replies.map((r) => (r.id === replyId ? { ...r, reactionTotal: likeCount } : r)) }
                        : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to like comment"));
        }
    };

    const toPostProps = (post: FeedPostEntry): UIPost => ({
        author: { name: post.authorName, avatar: post.authorAvatar, href: "profile.html" },
        timeAgo: post.timeAgo,
        title: post.title,
        image: post.image,
        reactorAvatars: post.reactorAvatars,
        extraReactorCount: post.extraReactorCount,
        shareCount: post.shareCount,
        commentCount: post.replyCount,
        comments: post.replies,
    });

    return (
        <FeedLayout>
            <CreateNewPost onPost={handleCreatePost} />

            {[STATIC_EXAMPLE_POST, ...posts].map((post) => {
                const isStatic = post.id === STATIC_EXAMPLE_POST.id;

                return (
                    <FeedPost
                        key={post.id}
                        post={toPostProps(post)}
                        currentUserAvatar={CURRENT_USER_AVATAR}
                        newCommentTextareaId={`new-comment-${post.id}`}
                        activeReaction={post.userReaction}
                        onMenuSelect={(key) => console.log("menu action:", key)}
                        onReact={isStatic ? () => console.log("reacted") : () => handleReact(post.id)}
                        onComment={() => document.getElementById(`new-comment-${post.id}`)?.focus()}
                        onShare={isStatic ? () => console.log("shared post") : undefined}
                        onNewComment={isStatic ? undefined : (text) => handleNewComment(post.id, text)}
                        onLikeComment={isStatic ? undefined : (replyId) => handleLikeReply(post.id, replyId)}
                        onShareComment={(id) => console.log("shared comment", id)}
                        onReplyComment={isStatic ? undefined : (_replyId, text) => handleNewComment(post.id, text)}
                    />
                );
            })}

            {hasMorePosts && (
                <div className="_previous_comment">
                    <button type="button" className="_previous_comment_txt" onClick={handleLoadMorePosts}>
                        Load more posts
                    </button>
                </div>
            )}
        </FeedLayout>
    );
}

export default FeedPostWrapper;
