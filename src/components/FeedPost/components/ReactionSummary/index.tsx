import { type FC } from "react";

export interface ReactionSummaryProps {
    reactorAvatars?: string[];
    extraReactorCount?: number;
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    onShowLikes?: () => void;
}

const ReactionSummary: FC<ReactionSummaryProps> = ({
    reactorAvatars = [],
    extraReactorCount = 0,
    likeCount = 0,
    commentCount = 0,
    shareCount = 0,
    onShowLikes,
}) => (
    <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div
            className="_feed_inner_timeline_total_reacts_image"
            onClick={likeCount > 0 ? onShowLikes : undefined}
            role={likeCount > 0 && onShowLikes ? "button" : undefined}
            tabIndex={likeCount > 0 && onShowLikes ? 0 : undefined}
            style={likeCount > 0 && onShowLikes ? { cursor: "pointer" } : undefined}
        >
            {reactorAvatars.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt="Reactor"
                    className={i === 0 ? "_react_img1" : i > 1 ? "_react_img _rect_img_mbl_none" : "_react_img"}
                />
            ))}
            {extraReactorCount > 0 && <p className="_feed_inner_timeline_total_reacts_para">{extraReactorCount}+</p>}
            {reactorAvatars.length === 0 && likeCount > 0 && (
                <p className="_feed_inner_timeline_total_reacts_para">
                    {likeCount} Like{likeCount !== 1 ? "s" : ""}
                </p>
            )}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
            <p className="_feed_inner_timeline_total_reacts_para1">
                <span>{commentCount}</span> Comment
            </p>
            <p className="_feed_inner_timeline_total_reacts_para2">
                <span>{shareCount}</span> Share
            </p>
        </div>
    </div>
);

export default ReactionSummary;