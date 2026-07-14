import { type FC } from "react";
import peopleImage1 from "staticImages/people1.png";
import peopleImage2 from "staticImages/people2.png";
import peopleImage3 from "staticImages/people3.png";
import feedEventImage from "staticImages/feed_event1.png";
import {
    LearningIcon,
    InsightsIcon,
    FindFriendsIcon,
    BookmarksIcon,
    GroupIcon,
    GamingIcon,
    SettingsIcon,
    SavePostIcon,
} from "layouts/Feed/icons";

interface ExploreLink {
    key: string;
    href: string;
    label: string;
    icon: FC;
    isNew?: boolean;
}

const exploreLinks: ExploreLink[] = [
    { key: "learning", href: "#0", label: "Learning", icon: LearningIcon, isNew: true },
    { key: "insights", href: "#0", label: "Insights", icon: InsightsIcon },
    { key: "find-friends", href: "find-friends.html", label: "Find friends", icon: FindFriendsIcon },
    { key: "bookmarks", href: "#0", label: "Bookmarks", icon: BookmarksIcon },
    { key: "group", href: "group.html", label: "Group", icon: GroupIcon },
    { key: "gaming", href: "#0", label: "Gaming", icon: GamingIcon, isNew: true },
    { key: "settings", href: "#0", label: "Settings", icon: SettingsIcon },
    { key: "save-post", href: "#0", label: "Save post", icon: SavePostIcon },
];

interface SuggestedPerson {
    id: string;
    name: string;
    title: string;
    avatar: string;
}

const suggestedPeople: SuggestedPerson[] = [
    { id: "steve-jobs", name: "Steve Jobs", title: "CEO of Apple", avatar: peopleImage1 },
    { id: "ryan-roslansky", name: "Ryan Roslansky", title: "CEO of Linkedin", avatar: peopleImage2 },
    { id: "dylan-field", name: "Dylan Field", title: "CEO of Figma", avatar: peopleImage3 },
];

interface FeedEvent {
    id: string;
    title: string;
    day: string;
    month: string;
    goingCount: number;
    image: string;
    href: string;
}

const events: FeedEvent[] = [
    { id: "event-1", title: "No more terrorism no more cry", day: "10", month: "Jul", goingCount: 17, image: feedEventImage, href: "event-single.html" },
    { id: "event-2", title: "No more terrorism no more cry", day: "10", month: "Jul", goingCount: 17, image: feedEventImage, href: "event-single.html" },
];

const LeftSidebar: FC = () => {
    return (
        <div className="_layout_left_sidebar_wrap">
            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <h4 className="_left_inner_area_explore_title _title5 _mar_b24">Explore</h4>
                    <ul className="_left_inner_area_explore_list">
                        {exploreLinks.map(({ key, href, label, icon: Icon, isNew }) => (
                            <li key={key} className={`_left_inner_area_explore_item${isNew ? " _explore_item" : ""}`}>
                                <a href={href} className="_left_inner_area_explore_link">
                                    <Icon />
                                    {label}
                                </a>
                                {isNew && <span className="_left_inner_area_explore_link_txt">New</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_area_suggest_content _mar_b24">
                        <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
                        <span className="_left_inner_area_suggest_content_txt">
                            <a className="_left_inner_area_suggest_content_txt_link" href="#0">See All</a>
                        </span>
                    </div>
                    {suggestedPeople.map(({ id, name, title, avatar }, index) => (
                        <div className="_left_inner_area_suggest_info" key={id}>
                            <div className="_left_inner_area_suggest_info_box">
                                <div className="_left_inner_area_suggest_info_image">
                                    <a href="profile.html">
                                        <img src={avatar} alt={name} className={index === 0 ? "_info_img" : "_info_img1"} />
                                    </a>
                                </div>
                                <div className="_left_inner_area_suggest_info_txt">
                                    <a href="profile.html">
                                        <h4 className="_left_inner_area_suggest_info_title">{name}</h4>
                                    </a>
                                    <p className="_left_inner_area_suggest_info_para">{title}</p>
                                </div>
                            </div>
                            <div className="_left_inner_area_suggest_info_link">
                                <a href="#0" className="_info_link">Connect</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_event_content">
                        <h4 className="_left_inner_event_title _title5">Events</h4>
                        <a href="event.html" className="_left_inner_event_link">See all</a>
                    </div>
                    {events.map(({ id, title, day, month, goingCount, image, href }) => (
                        <div className="_left_inner_event_card" key={id}>
                            <a className="_left_inner_event_card_link" href={href}>
                                <div className="_left_inner_event_card_iamge">
                                    <img src={image} alt={title} className="_card_img" />
                                </div>
                                <div className="_left_inner_event_card_content">
                                    <div className="_left_inner_card_date">
                                        <p className="_left_inner_card_date_para">{day}</p>
                                        <p className="_left_inner_card_date_para1">{month}</p>
                                    </div>
                                    <div className="_left_inner_card_txt">
                                        <h4 className="_left_inner_event_card_title">{title}</h4>
                                    </div>
                                </div>
                            </a>
                            <hr className="_underline" />
                            <div className="_left_inner_event_bottom">
                                <p className="_left_iner_event_bottom">{goingCount} People Going</p>
                                <a href="#0" className="_left_iner_event_bottom_link">Going</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
