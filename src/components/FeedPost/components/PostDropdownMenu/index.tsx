import { type FC, useEffect, useRef, useState } from "react";
import { DotsIcon, SaveIcon, NotificationIcon, HideIcon, EditIcon, DeleteIcon } from "components/FeedPost/icons";
import type { MenuItem } from "components/FeedPost/types";

/**
 * Default menu items. Consumers can override this entirely via the
 * `items` prop, so the same dropdown works for "my post" (edit/delete)
 * vs. "someone else's post" (report/unfollow, etc).
 */
const DEFAULT_ITEMS: MenuItem[] = [
    { key: "save", label: "Save Post", icon: <SaveIcon /> },
    { key: "notify", label: "Turn On Notification", icon: <NotificationIcon /> },
    { key: "hide", label: "Hide", icon: <HideIcon /> },
    { key: "edit", label: "Edit Post", icon: <EditIcon /> },
    { key: "delete", label: "Delete Post", icon: <DeleteIcon /> },
];

export interface PostDropdownMenuProps {
    items?: MenuItem[];
    onSelect?: (key: string) => void;
}

/**
 * PostDropdownMenu
 * A trigger (three dots) + popover list. Fully controlled by its own
 * open/closed state, and closes on outside click.
 */
const PostDropdownMenu: FC<PostDropdownMenuProps> = ({ items = DEFAULT_ITEMS, onSelect }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (item: MenuItem) => {
        item.onClick?.();
        onSelect?.(item.key);
        setOpen(false);
    };

    useEffect(() => {
        console.log(open);
    }, [open]);

    return (
        <div className="_feed_inner_timeline_post_box_dropdown" ref={containerRef}>
            <div className="_feed_timeline_post_dropdown">
                <button
                    type="button"
                    className="_feed_timeline_post_dropdown_link"
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => {
                        console.log("clicked");
                        setOpen((o) => !o);
                    }}
                >
                    <DotsIcon />
                </button>
            </div>

            {open && (
                <div className="_feed_timeline_dropdown"
                    style={{
                        opacity: 1,
                        visibility: "visible",
                        transform: "translateY(40px)",
                    }}>
                    <ul className="_feed_timeline_dropdown_list">
                        {items.map((item) => (
                            <li className="_feed_timeline_dropdown_item" key={item.key}>
                                <a
                                    href="#0"
                                    className="_feed_timeline_dropdown_link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick(item);
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostDropdownMenu;