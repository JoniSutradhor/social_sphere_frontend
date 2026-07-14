import { EmojiIcon, ImageIcon } from "components/FeedPost/icons";
import { type FC, useState, type KeyboardEvent } from "react";

export interface CommentComposerProps {
    avatarSrc: string;
    placeholder?: string;
    textareaId?: string;
    onSubmit?: (text: string) => void;
    onEmojiClick?: () => void;
    onImageClick?: () => void;
}

/**
 * CommentComposer
 * A single-line comment input with an avatar and two icon actions
 * (emoji / attach image). Used both for writing a brand-new top-level
 * comment and for replying to an existing one - just change
 * `placeholder` and `onSubmit`.
 */
const CommentComposer: FC<CommentComposerProps> = ({
    avatarSrc,
    placeholder = "Write a comment",
    textareaId = "comment-composer",
    onSubmit,
    onEmojiClick,
    onImageClick,
}) => {
    const [value, setValue] = useState("");

    const submit = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        onSubmit?.(trimmed);
        setValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return (
        <div className="_feed_inner_comment_box">
            <form
                className="_feed_inner_comment_box_form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <div className="_feed_inner_comment_box_content">
                    <div className="_feed_inner_comment_box_content_image">
                        <img src={avatarSrc} alt="You" className="_comment_img" />
                    </div>
                    <div className="_feed_inner_comment_box_content_txt">
                        <textarea
                            className="form-control _comment_textarea"
                            placeholder={placeholder}
                            id={textareaId}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="_feed_inner_comment_box_icon">
                    <button type="button" className="_feed_inner_comment_box_icon_btn" onClick={onEmojiClick}>
                        <EmojiIcon />
                    </button>
                    <button type="button" className="_feed_inner_comment_box_icon_btn" onClick={onImageClick}>
                        <ImageIcon />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentComposer;