
export function handleResponse(res, { status = 200, success = true, message = "", data = null }) {
    const response = { success, message };

    if (data !== null) {
        response.data = data;
    }
    return res.status(status).json(response);
}

export function handleError(res, { status = 500, message = "Something went wrong", errors = null }) {
    const response = { success: false, message };

    if (errors) {
        response.errors = errors;
    }

    return res.status(status).json(response);
}
