import { ValidationError } from "express-validator"

export class ApiError extends Error   {
    status
    errors

    constructor(status: number, message: string, errors: never[] | ValidationError[]= []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }
    static ForbiddenError() {
        return new ApiError(403, 'Нет доступа!')
    }

    static BadRequest(message = '', errors: never[] | ValidationError[] = []) {
        return new ApiError(400, message, errors)

    }
}