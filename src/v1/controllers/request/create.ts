import {Request, Response} from "express";
import {HttpStatusCode as status} from "../../config/status";
import {createRequest, saveRequest, validateRequest} from "../../services/request";

export default async function (req: Request, res: Response) {

    // Validate request data
    const validate = await validateRequest(req.body);

    if (validate.status !== status.OK) {
        return res.status(validate.status).json(validate);
    }

    // Create object request
    const request = createRequest(req.body);

    if (request.status !== status.CREATED) {
        return res.status(request.status).send(request);
    }

    // Save request
    const response = await saveRequest(request.data);

    // Handle response
    if (response.status !== status.CREATED) {
        return res.status(response.status).send(response);
    }

    res.status(status.CREATED).send({status: status.CREATED, request: response.data});

}