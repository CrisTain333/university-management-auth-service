type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
};
type IOptionsReturn = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsReturn => {
    const page = Number(options?.page);
    const limit = Number(options?.limit);
    const skip = (page - 1) * limit;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    };
};

export const paginationHelper = {
    calculatePagination
};
