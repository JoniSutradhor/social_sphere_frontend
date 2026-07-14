const config = {
    social_sphere_api_url: import.meta.env.VITE_SOCIAL_SPHERE_API_URL || '',
    social_sphere_api_version:
        import.meta.env.VITE_SOCIAL_SPHERE_API_VERSION || '',
    social_sphere_api_timeout:
        Number(import.meta.env.VITE_SOCIAL_SPHERE_API_TIMEOUT) || 20000,
    social_sphere_app_url: import.meta.env.VITE_SOCIAL_SPHERE_APP_URL || '',
    asset_path: import.meta.env.VITE_SOCIAL_SPHERE_BASE_PATH || '/',
    dom_root_id: '__SOCIAL_SPHERE_APP_ROOT__',
};

export default config;
