type IOptions = {
    page?: number;
    limit?: number;
};
type IOptionsReturn = {
    page: number;
    limit: number;
    skip: number;
};

const calculatePagination = (options: IOptions): IOptionsReturn => {
    const page = Number(options?.page);
    const limit = Number(options?.limit);
    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    };
};

export default calculatePagination;
