import { type ReactNode, useState } from "react";
import Navbar from "components/Navbar";
import logo from "staticImages/logo.svg";
import LeftSidebar from "layouts/Feed/components/LeftSidebar";
import RightSidebar from "layouts/Feed/components/RightSidebar";
import {
    MoonIcon,
    SunIcon,
    SearchIcon,
    HamburgerIcon,
    MobileFeedIcon,
    MobileFriendRequestIcon,
    MobileNotificationIcon,
    MobileChatIcon,
} from "layouts/Feed/icons";

interface FeedLayoutProps {
    children: ReactNode;
}

const FeedLayout = ({ children }: FeedLayoutProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className={`_layout _layout_main_wrapper${isDarkMode ? " _dark_wrapper" : ""}`}>
            <div className="_layout_mode_swithing_btn">
                <button
                    type="button"
                    className="_layout_swithing_btn_link"
                    onClick={() => setIsDarkMode((prev) => !prev)}
                >
                    <div className="_layout_swithing_btn">
                        <div className="_layout_swithing_btn_round" />
                    </div>
                    <div className="_layout_change_btn_ic1">
                        <MoonIcon />
                    </div>
                    <div className="_layout_change_btn_ic2">
                        <SunIcon />
                    </div>
                </button>
            </div>

            <div className="_main_layout">
                <Navbar />

                <div className="_header_mobile_menu">
                    <div className="_header_mobile_menu_wrap">
                        <div className="container">
                            <div className="_header_mobile_menu">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_header_mobile_menu_top_inner">
                                            <div className="_header_mobile_menu_logo">
                                                <a href="/feed" className="_mobile_logo_link">
                                                    <img src={logo} alt="Image" className="_nav_logo" />
                                                </a>
                                            </div>
                                            <div className="_header_mobile_menu_right">
                                                <form className="_header_form_grp" onSubmit={(e) => e.preventDefault()}>
                                                    <a href="#0" className="_header_mobile_search">
                                                        <SearchIcon />
                                                    </a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="_mobile_navigation_bottom_wrapper">
                    <div className="_mobile_navigation_bottom_wrap">
                        <div className="conatiner">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <ul className="_mobile_navigation_bottom_list">
                                        <li className="_mobile_navigation_bottom_item">
                                            <a href="/feed" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active">
                                                <MobileFeedIcon />
                                            </a>
                                        </li>
                                        <li className="_mobile_navigation_bottom_item">
                                            <a href="friend-request.html" className="_mobile_navigation_bottom_link">
                                                <MobileFriendRequestIcon />
                                            </a>
                                        </li>
                                        <li className="_mobile_navigation_bottom_item">
                                            <a href="#0" className="_mobile_navigation_bottom_link">
                                                <MobileNotificationIcon />
                                                <span className="_counting">6</span>
                                            </a>
                                        </li>
                                        <li className="_mobile_navigation_bottom_item">
                                            <a href="chat.html" className="_mobile_navigation_bottom_link">
                                                <MobileChatIcon />
                                                <span className="_counting">2</span>
                                            </a>
                                        </li>
                                        <div className="_header_mobile_toggle">
                                            <button type="button" className="_header_mobile_btn_link">
                                                <HamburgerIcon />
                                            </button>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <LeftSidebar />
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="_layout_middle_wrap">
                                    <div className="_layout_middle_inner">{children}</div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedLayout;
