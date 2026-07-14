import FeedPost from "components/FeedPost";
import type { Post } from "components/FeedPost/types";
import { type FC, useState } from "react";
import postImg from "staticImages/post_img.png";
import timeLineImg from "staticImages/timeline_img.png";
import reactImg1 from "staticImages/react_img1.png";
import reactImg2 from "staticImages/react_img2.png";
import reactImg3 from "staticImages/react_img3.png";
import reactImg4 from "staticImages/react_img4.png";
import reactImg5 from "staticImages/react_img5.png";
import txtImg from "staticImages/txt_img.png";
import commentImg from "staticImages/comment_img.png";
import CreateNewPost from "components/CreatePost";
import FeedLayout from "layouts/Feed";

// Sample data shaped to match the original static markup you shared.
const initialPost: Post = {
    author: {
        name: "Karim Saif",
        avatar: postImg,
        href: "profile.html",
    },
    timeAgo: "5 minute",
    visibility: "Public",
    title: "-Healthy Tracking App",
    image: timeLineImg,
    reactorAvatars: [reactImg1, reactImg2, reactImg3, reactImg4, reactImg5],
    extraReactorCount: 9,
    commentCount: 12,
    shareCount: 122,
    previousCommentCount: 4,
    comments: [
        {
            id: "c1",
            authorName: "Radovan SkillArena",
            authorAvatar: txtImg,
            text:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            reactionTotal: 198,
            timeAgo: "21m",
            profileHref: "profile.html",
        },
    ],
};

const CURRENT_USER_AVATAR = commentImg;

const FeedPostWrapper: FC = () => {
    const [post, setPost] = useState<Post>(initialPost);

    const handleNewComment = (text: string) => {
        setPost((p) => ({
            ...p,
            comments: [
                ...p.comments,
                {
                    id: `c${Date.now()}`,
                    authorName: "You",
                    authorAvatar: CURRENT_USER_AVATAR,
                    text,
                    reactionTotal: 0,
                    timeAgo: "just now",
                },
            ],
        }));
    };

    const handleReply = (commentId: string, replyText: string) => {
        // In a real app, replies might be nested under the parent comment;
        // here we just append them as new top-level comments for simplicity.
        handleNewComment(`@reply to ${commentId}: ${replyText}`);
    };

    return (
        <FeedLayout>
            <CreateNewPost />
            <FeedPost
                post={post}
                currentUserAvatar={CURRENT_USER_AVATAR}
                onMenuSelect={(key) => console.log("menu action:", key)}
                onReact={() => console.log("reacted")}
                onComment={() => document.getElementById("new-comment")?.focus()}
                onShare={() => console.log("shared post")}
                onNewComment={handleNewComment}
                onLoadPreviousComments={() => console.log("load previous comments")}
                onLikeComment={(id) => console.log("liked comment", id)}
                onShareComment={(id) => console.log("shared comment", id)}
                onReplyComment={handleReply}
            />
        </FeedLayout>
    );
};

export default FeedPostWrapper;