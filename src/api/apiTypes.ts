export interface ApiMessageResponse {
    success: boolean;
    message: string;
}

export interface ApiDataResponse<T> extends ApiMessageResponse {
    data: T;
}

export interface PaginationMeta {
    nextCursor: string | null;
    hasMore: boolean;
}
