export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: {
    path: string | number;
    message: string;
  }[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
