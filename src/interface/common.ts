export type IGenericErrorResponse = {
    statusCode: number | string;
    message: string;
    errorMessages: {
        path: string;
        message: string;
    }[];
};
