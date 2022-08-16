import { Request, Response } from "express";
import queryParamsValidation from "../../validators/queryParamsValidation";
import {HttpStatusCode as status} from "../../config/status";
import {deleteProjectQuery} from "../../services/project";

export default async function (req: Request, res: Response) {

    // Validate query param
    const validQueryData = queryParamsValidation(req.body);

    if (validQueryData.status !== status.OK) {
        return res.status(validQueryData.status).send(validQueryData);
    }

    // Delete project or projects
    const response = await deleteProjectQuery(req.body.query);

    if (response.status !== status.OK) {
        return res.status(response.status).send(response);
    }

    res.status(status.OK).send({
        status: status.OK,
        message: response.message
    });

}

