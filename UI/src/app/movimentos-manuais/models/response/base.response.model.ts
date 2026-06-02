export interface BaseResponseModel<T> {
    message: string[];
    data: T;
}