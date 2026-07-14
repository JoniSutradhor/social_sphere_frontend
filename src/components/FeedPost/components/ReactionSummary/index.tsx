import { type FC } from "react";

export interface ReactionSummaryProps {
    reactorAvatars?: string[];
    extraReactorCount?: number;
    commentCount?: number;
    shareCount?: number;
}

/**
 * ReactionSummary
 * The row showing a stack of reactor avatars, a "+N" overflow count,
 * and the comment/share totals.
 */
const ReactionSummary: FC<ReactionSummaryProps> = ({
    reactorAvatars = [],
    extraReactorCount = 0,
    commentCount = 0,
    shareCount = 0,
}) => (
    <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
            {reactorAvatars.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt="Reactor"
                    className={i === 0 ? "_react_img1" : i > 1 ? "_react_img _rect_img_mbl_none" : "_react_img"}
                />
            ))}
            {extraReactorCount > 0 && <p className="_feed_inner_timeline_total_reacts_para">{extraReactorCount}+</p>}
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