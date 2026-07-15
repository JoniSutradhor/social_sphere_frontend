import config from 'utils/config';

export const resolveUploadUrl = (imageUrl: string | null): string | undefined =>
    imageUrl ? `${config.social_sphere_api_url}${imageUrl}` : undefined;
