import { type FC } from "react";

export interface PostContentProps {
    title?: string;
    imageSrc?: string;
}

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