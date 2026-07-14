import { type FC } from "react";

export interface PostContentProps {
    title?: string;
    imageSrc?: string;
}

/**
 * PostContent
 * Renders the post's text/title and, if present, an image.
 * Keeping this separate makes it trivial to support text-only posts,
 * image-only posts, or (later) video/carousel posts without touching
 * the rest of the card.
 */
const PostContent: FC<PostContentProps> = ({ title, imageSrc }) => (
    <>
        {title && <h4 className="_feed_inner_timeline_post_title">{title}</h4>}
        {imageSrc && (
            <div className="_feed_inner_timeline_image">
                <img src={imageSrc} alt={title || "Post attachment"} className="_time_img" />
            </div>
        )}
    </>
);

export default PostContent;