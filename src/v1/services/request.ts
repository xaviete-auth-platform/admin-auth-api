import {HttpStatusCode as status, HttpStatusCode as statusCode} from "../config/status";
import {requestValidation} from "../validators/requestValidators";
import RequestLog from "../models/RequestLog";

export async function validateRequest(body: any) {

    const { error } = await requestValidation.validate(body);

    if (error) {
        return {
            status: statusCode.NOT_ACCEPTABLE,
            message: error.message,
            error: error
        };
    }

    return {
        status: statusCode.OK,
        message: 'Request validated successfully'
    }
}

export function createRequest(data: any) {

    try {

        const { project_id, code, message, ...rest } = data;

        // Create request
        const request = new RequestLog({
            'project_id': project_id,
            'code': code,
            'message': message,
            'others': rest
        });

        return {
            status: statusCode.CREATED,
            data: request
        };

    } catch (e) {

        return {
            status: statusCode.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        };

    }
}

export async function saveRequest(request: any) {

    try {

        // Save request
        const data = await request.save();

        return {
            status: status.CREATED,
            data: data
        };

    } catch (err) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: err.message,
            error: err
        };

    }

}