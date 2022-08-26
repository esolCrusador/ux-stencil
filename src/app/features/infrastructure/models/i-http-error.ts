export interface IHttpError {
    url: string;
    httpStatus: number;
    httpStatusMessage: string;
    error: {
        code: number;
        message: string;
    };
}
