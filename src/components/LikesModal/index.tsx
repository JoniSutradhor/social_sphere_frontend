import { type FC, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import SocialSphereApiPost from "api/socialSphereApiPost";
import SocialSphereApiComment, { type Reactor } from "api/socialSphereApiComment";
import defaultAvatar from "staticImages/profile.png";

export type LikesModalTarget = { type: "post" | "comment"; id: string } | null;

export interface LikesModalProps {
    target: LikesModalTarget;
    onClose: () => void;
}

const LIMIT = 20;

const fetchReactorsPage = (target: NonNullable<LikesModalTarget>, cursor?: string) =>
    target.type === "post"
        ? SocialSphereApiPost.getPostLikes(target.id, { cursor, limit: LIMIT })
        : SocialSphereApiComment.getCommentLikes(target.id, { cursor, limit: LIMIT });

const LikesModal: FC<LikesModalProps> = ({ target, onClose }) => {
    const [reactors, setReactors] = useState<Reactor[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!target) return;
        let cancelled = false;

        setReactors([]);
        setCursor(null);
        setHasMore(false);
        setError(null);
        setLoading(true);

        fetchReactorsPage(target)
            .then(({ data, pagination }) => {
                if (cancelled) return;
                setReactors(data);
                setCursor(pagination.nextCursor);
                setHasMore(pagination.hasMore);
            })
            .catch((err) => {
                if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load likes");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target?.type, target?.id]);

    const handleLoadMore = async () => {
        if (!target || !cursor || loading) return;
        setLoading(true);
        try {
            const { data, pagination } = await fetchReactorsPage(target, cursor);
            setReactors((prev) => [...prev, ...data]);
            setCursor(pagination.nextCursor);
            setHasMore(pagination.hasMore);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load likes");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={!!target} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Liked by</DialogTitle>
            <DialogContent dividers sx={{ minHeight: 120 }}>
                {loading && reactors.length === 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}

                {!loading && reactors.length === 0 && !error && (
                    <Typography color="text.secondary" align="center" sx={{ py: 3 }}>
                        No likes yet
                    </Typography>
                )}

                {error && (
                    <Typography color="error" align="center" sx={{ py: 3 }}>
                        {error}
                    </Typography>
                )}

                <List disablePadding>
                    {reactors.map(({ user }) => (
                        <ListItem key={user._id} disableGutters>
                            <ListItemAvatar>
                                <Avatar src={user.avatar || defaultAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={[user.firstName, user.lastName].filter(Boolean).join(" ") || "Anonymous"} />
                        </ListItem>
                    ))}
                </List>

                {hasMore && (
                    <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                        <Button size="small" onClick={handleLoadMore} disabled={loading}>
                            {loading ? "Loading..." : "Load more"}
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LikesModal;
