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
import SocialSphereApiPost, { type Post as ApiPost, type PostVisibility } from "api/socialSphereApiPost";
import SocialSphereApiComment, {
    type Comment as ApiComment,
    type ReactionType,
} from "api/socialSphereApiComment";
import LikesModal, { type LikesModalTarget } from "components/LikesModal";
import { toast } from "core_components/Toaster";
import { formatRelativeTime } from "utils/formatRelativeTime";
import { resolveUploadUrl } from "utils/resolveUploadUrl";

const POSTS_PAGE_SIZE = 5;
const COMMENTS_PAGE_SIZE = 5;
const CURRENT_USER_AVATAR = commentImg;

interface FeedPostEntry {
    id: string;
    authorName: string;
    authorAvatar: string;
    timeAgo: string;
    content: string;
    image?: string;
    visibility: PostVisibility;
    reactorAvatars?: string[];
    extraReactorCount?: number;
    shareCount?: number;
    likeCount: number;
    userReaction: ReactionType | null;
    commentCount: number;
    comments: UIComment[];
    hasMoreComments: boolean;
    nextCommentsCursor: string | null;
}

const STATIC_EXAMPLE_POST: FeedPostEntry = {
    id: "static-example",
    authorName: "Karim Saif",
    authorAvatar: postImg,
    timeAgo: "5 minute",
    content: "-Healthy Tracking App",
    image: timeLineImg,
    visibility: "public",
    reactorAvatars: [reactImg1, reactImg2, reactImg3, reactImg4, reactImg5],
    extraReactorCount: 9,
    shareCount: 122,
    likeCount: 0,
    userReaction: null,
    commentCount: 1,
    comments: [
        {
            id: "static-comment-1",
            authorName: "Radovan SkillArena",
            authorAvatar: txtImg,
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            reactionTotal: 198,
            timeAgo: "21m",
        },
    ],
    hasMoreComments: false,
    nextCommentsCursor: null,
};

const mapReply = (comment: ApiComment): UIComment => {
    const fullName = [comment.user.firstName, comment.user.lastName].filter(Boolean).join(" ");

    return {
        id: comment._id,
        authorName: fullName || "Anonymous",
        authorAvatar: comment.user.avatar || defaultAvatar,
        text: comment.content,
        reactionTotal: comment.likeCount,
        liked: comment.userReaction === "like",
        timeAgo: formatRelativeTime(comment.createdAt),
    };
};

const mapPost = (post: ApiPost): FeedPostEntry => {
    const fullName = [post.user.firstName, post.user.lastName].filter(Boolean).join(" ");

    return {
        id: post._id,
        authorName: fullName || "Anonymous",
        authorAvatar: post.user.avatar || defaultAvatar,
        timeAgo: formatRelativeTime(post.createdAt),
        content: post.content,
        image: resolveUploadUrl(post.imageUrl),
        visibility: post.visibility,
        likeCount: post.likeCount,
        userReaction: post.userReaction,
        commentCount: post.commentCount,
        comments: [],
        hasMoreComments: false,
        nextCommentsCursor: null,
    };
};

const getApiErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

const loadCommentWithReplies = async (comment: ApiComment): Promise<UIComment> => {
    const mapped = mapReply(comment);
    if (comment.replyCount === 0) return mapped;

    try {
        const { data } = await SocialSphereApiComment.getReplies(comment._id);
        return { ...mapped, replies: data.map(mapReply) };
    } catch {
        return mapped;
    }
};

const loadCommentsForPost = async (postId: string) => {
    const { data, pagination } = await SocialSphereApiComment.getComments(postId, {
        limit: COMMENTS_PAGE_SIZE,
    });
    const comments = await Promise.all(data.map(loadCommentWithReplies));

    return { comments, hasMore: pagination.hasMore, nextCursor: pagination.nextCursor };
};

const mapPostWithComments = async (post: ApiPost): Promise<FeedPostEntry> => {
    const entry = mapPost(post);
    const { comments, hasMore, nextCursor } = await loadCommentsForPost(post._id);

    return { ...entry, comments, hasMoreComments: hasMore, nextCommentsCursor: nextCursor };
};

function FeedPostWrapper() {
    const [posts, setPosts] = useState<FeedPostEntry[]>([]);
    const [nextPostsCursor, setNextPostsCursor] = useState<string | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState(false);
    const [likesTarget, setLikesTarget] = useState<LikesModalTarget>(null);

    useEffect(() => {
        let cancelled = false;

        SocialSphereApiPost.getFeed({ limit: POSTS_PAGE_SIZE })
            .then(async ({ data, pagination }) => {
                if (cancelled) return;
                const withComments = await Promise.all(data.map(mapPostWithComments));
                if (cancelled) return;
                setPosts(withComments);
                setNextPostsCursor(pagination.nextCursor);
                setHasMorePosts(pagination.hasMore);
            })
            .catch((err) => {
                if (!cancelled) toast.error(getApiErrorMessage(err, "Failed to load posts"));
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCreatePost = async (text: string, image?: File, visibility: PostVisibility = "public") => {
        try {
            const created = await SocialSphereApiPost.createPost(text, image, visibility);
            setPosts((prev) => [mapPost(created), ...prev]);
            toast.success(created.message);
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to create post"));
        }
    };

    const handleLoadMorePosts = async () => {
        if (!hasMorePosts || !nextPostsCursor) return;

        try {
            const { data, pagination } = await SocialSphereApiPost.getFeed({
                cursor: nextPostsCursor,
                limit: POSTS_PAGE_SIZE,
            });
            const withComments = await Promise.all(data.map(mapPostWithComments));
            setPosts((prev) => [...prev, ...withComments]);
            setNextPostsCursor(pagination.nextCursor);
            setHasMorePosts(pagination.hasMore);
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to load more posts"));
        }
    };

    const handleReactPost = async (postId: string) => {
        try {
            const { likeCount, userReaction } = await SocialSphereApiPost.likePost(postId);
            setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likeCount, userReaction } : p)));
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to react to post"));
        }
    };

    const handleCreateComment = async (postId: string, text: string) => {
        try {
            const created = await SocialSphereApiComment.createComment(text, postId);
            const comment = mapReply(created);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? { ...p, commentCount: p.commentCount + 1, comments: [...p.comments, comment] }
                        : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to post comment"));
        }
    };

    const handleReplyToComment = async (postId: string, commentId: string, text: string) => {
        try {
            const created = await SocialSphereApiComment.createReply(commentId, text);
            const reply = mapReply(created);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? {
                              ...p,
                              comments: p.comments.map((c) =>
                                  c.id === commentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c
                              ),
                          }
                        : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to post reply"));
        }
    };

    const handleLikeComment = async (postId: string, commentId: string) => {
        try {
            const { likeCount, userReaction } = await SocialSphereApiComment.likeComment(commentId);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? {
                              ...p,
                              comments: p.comments.map((c) =>
                                  c.id === commentId
                                      ? { ...c, reactionTotal: likeCount, liked: userReaction === "like" }
                                      : c
                              ),
                          }
                        : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to like comment"));
        }
    };

    const handleLikeReply = async (postId: string, replyId: string) => {
        try {
            const { likeCount, userReaction } = await SocialSphereApiComment.likeComment(replyId);
            setPosts((prev) =>
                prev.map((p) => {
                    if (p.id !== postId) return p;
                    return {
                        ...p,
                        comments: p.comments.map((c) =>
                            c.replies
                                ? {
                                      ...c,
                                      replies: c.replies.map((r) =>
                                          r.id === replyId
                                              ? { ...r, reactionTotal: likeCount, liked: userReaction === "like" }
                                              : r
                                      ),
                                  }
                                : c
                        ),
                    };
                })
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to like reply"));
        }
    };

    const handleShowPostLikes = (postId: string) => setLikesTarget({ type: "post", id: postId });
    const handleShowCommentLikes = (commentId: string) => setLikesTarget({ type: "comment", id: commentId });

    const handleLoadMoreComments = async (postId: string) => {
        const post = posts.find((p) => p.id === postId);
        if (!post || !post.hasMoreComments || !post.nextCommentsCursor) return;

        try {
            const { data, pagination } = await SocialSphereApiComment.getComments(postId, {
                cursor: post.nextCommentsCursor,
                limit: COMMENTS_PAGE_SIZE,
            });
            const newComments = await Promise.all(data.map(loadCommentWithReplies));

            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId
                        ? {
                              ...p,
                              comments: [...p.comments, ...newComments],
                              hasMoreComments: pagination.hasMore,
                              nextCommentsCursor: pagination.nextCursor,
                          }
                        : p
                )
            );
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to load more comments"));
        }
    };

    const toPostProps = (post: FeedPostEntry): UIPost => ({
        author: { name: post.authorName, avatar: post.authorAvatar, href: "profile.html" },
        timeAgo: post.timeAgo,
        visibility: post.visibility === "private" ? "Only me" : "Public",
        title: post.content,
        image: post.image,
        reactorAvatars: post.reactorAvatars,
        extraReactorCount: post.extraReactorCount,
        likeCount: post.likeCount,
        shareCount: post.shareCount,
        commentCount: post.commentCount,
        hasMoreComments: post.hasMoreComments,
        comments: post.comments,
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
                        onReact={isStatic ? () => console.log("reacted") : () => handleReactPost(post.id)}
                        onComment={() => document.getElementById(`new-comment-${post.id}`)?.focus()}
                        onShare={isStatic ? () => console.log("shared post") : undefined}
                        onNewComment={isStatic ? undefined : (text) => handleCreateComment(post.id, text)}
                        onLoadPreviousComments={isStatic ? undefined : () => handleLoadMoreComments(post.id)}
                        onLikeComment={isStatic ? undefined : (commentId) => handleLikeComment(post.id, commentId)}
                        onShareComment={(id) => console.log("shared comment", id)}
                        onReplyComment={
                            isStatic ? undefined : (commentId, text) => handleReplyToComment(post.id, commentId, text)
                        }
                        onLikeReply={isStatic ? undefined : (replyId) => handleLikeReply(post.id, replyId)}
                        onShowPostLikes={isStatic ? undefined : () => handleShowPostLikes(post.id)}
                        onShowCommentLikes={isStatic ? undefined : handleShowCommentLikes}
                        onShowReplyLikes={isStatic ? undefined : handleShowCommentLikes}
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

            <LikesModal target={likesTarget} onClose={() => setLikesTarget(null)} />
        </FeedLayout>
    );
}

export default FeedPostWrapper;
