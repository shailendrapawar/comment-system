export function buildPagination(query = {}) {
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(query.limit, 10) || 20, 100);

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    };
} 