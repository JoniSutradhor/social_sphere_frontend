import config from 'utils/config';

// Post/Comment imageUrl is a server-relative path (e.g. "/uploads/xyz.jpg") —
// this resolves it against the API's own origin, not the app's own asset host.
export const resolveUploadUrl = (imageUrl: string | null): string | undefined =>
    imageUrl ? `${config.social_sphere_api_url}${imageUrl}` : undefined;
