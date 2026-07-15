import type { MenuItem } from "components/FeedPost/types";
import { type FC } from "react";
import PostDropdownMenu from "../PostDropdownMenu";
export interface PostAuthorHeaderProps {
    avatarSrc: string;
    authorName: string;
    timeAgo: string;
    visibility?: string;
    menuItems?: MenuItem[];
    onMenuSelect?: (key: string) => void;
    onAuthorClick?: () => void;
}

const PostAuthorHeader: FC<PostAuthorHeaderProps> = ({
    avatarSrc,
    authorName,
    timeAgo,
    visibility = "Public",
    menuItems,
    onMenuSelect,
    onAuthorClick,
}) => (
    <div className="_feed_inner_timeline_post_top">
        <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
                <img src={avatarSrc} alt={authorName} className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
                <h4 className="_feed_inner_timeline_post_box_title" onClick={onAuthorClick}>
                    {authorName}
                </h4>
                <p className="_feed_inner_timeline_post_box_para">
                    {timeAgo} ago . <a href="#0">{visibility}</a>
                </p>
            </div>
        </div>

        <PostDropdownMenu items={menuItems} onSelect={onMenuSelect} />
    </div>
);

export default PostAuthorHeader;