export type IGenericResponse = {
   statusCode: number | string;
   message: string;
   errorMessages: {
      path: string;
      message: string;
   }[];
};
