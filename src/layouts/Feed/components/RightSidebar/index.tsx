import { type FC } from "react";
import avatarImage from "staticImages/Avatar.png";
import peopleImage1 from "staticImages/people1.png";
import peopleImage2 from "staticImages/people2.png";
import peopleImage3 from "staticImages/people3.png";
import { OnlineDotIcon, SearchIcon } from "layouts/Feed/icons";

interface Friend {
    id: string;
    name: string;
    title: string;
    avatar: string;
    status: "online" | "away";
    lastSeen?: string;
}

const friendsBase: Friend[] = [
    { id: "steve-jobs", name: "Steve Jobs", title: "CEO of Apple", avatar: peopleImage1, status: "away", lastSeen: "5 minute ago" },
    { id: "ryan-roslansky", name: "Ryan Roslansky", title: "CEO of Linkedin", avatar: peopleImage2, status: "online" },
    { id: "dylan-field", name: "Dylan Field", title: "CEO of Figma", avatar: peopleImage3, status: "online" },
];

// Original markup repeated this trio twice
const friends: Friend[] = Array.from({ length: 2 }, (_, i) =>
    friendsBase.map((friend) => ({ ...friend, id: `${friend.id}-${i}` }))
).flat();

const RightSidebar: FC = () => {
    return (
        <div className="_layout_right_sidebar_wrap">
            <div className="_layout_right_sidebar_inner">
                <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_right_inner_area_info_content _mar_b24">
                        <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
                        <span className="_right_inner_area_info_content_txt">
                            <a className="_right_inner_area_info_content_txt_link" href="#0">See All</a>
                        </span>
                    </div>
                    <hr className="_underline" />
                    <div className="_right_inner_area_info_ppl">
                        <div className="_right_inner_area_info_box">
                            <div className="_right_inner_area_info_box_image">
                                <a href="profile.html">
                                    <img src={avatarImage} alt="Radovan SkillArena" className="_ppl_img" />
                                </a>
                            </div>
                            <div className="_right_inner_area_info_box_txt">
                                <a href="profile.html">
                                    <h4 className="_right_inner_area_info_box_title">Radovan SkillArena</h4>
                                </a>
                                <p className="_right_inner_area_info_box_para">Founder &amp; CEO at Trophy</p>
                            </div>
                        </div>
                        <div className="_right_info_btn_grp">
                            <button type="button" className="_right_info_btn_link">Ignore</button>
                            <button type="button" className="_right_info_btn_link _right_info_btn_link_active">Follow</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="_layout_right_sidebar_inner">
                <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_feed_top_fixed">
                        <div className="_feed_right_inner_area_card_content _mar_b24">
                            <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
                            <span className="_feed_right_inner_area_card_content_txt">
                                <a className="_feed_right_inner_area_card_content_txt_link" href="find-friends.html">See All</a>
                            </span>
                        </div>
                        <form className="_feed_right_inner_area_card_form" onSubmit={(e) => e.preventDefault()}>
                            <SearchIcon />
                            <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
                        </form>
                    </div>
                    <div className="_feed_bottom_fixed">
                        {friends.map(({ id, name, title, avatar, status, lastSeen }) => (
                            <div className={`_feed_right_inner_area_card_ppl${status === "away" ? " _feed_right_inner_area_card_ppl_inactive" : ""}`} key={id}>
                                <div className="_feed_right_inner_area_card_ppl_box">
                                    <div className="_feed_right_inner_area_card_ppl_image">
                                        <a href="profile.html">
                                            <img src={avatar} alt={name} className="_box_ppl_img" />
                                        </a>
                                    </div>
                                    <div className="_feed_right_inner_area_card_ppl_txt">
                                        <a href="profile.html">
                                            <h4 className="_feed_right_inner_area_card_ppl_title">{name}</h4>
                                        </a>
                                        <p className="_feed_right_inner_area_card_ppl_para">{title}</p>
                                    </div>
                                </div>
                                <div className="_feed_right_inner_area_card_ppl_side">
                                    {status === "away" ? <span>{lastSeen}</span> : <OnlineDotIcon />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
