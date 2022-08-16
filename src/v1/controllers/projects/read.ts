import {Request, Response} from "express";
import {HttpStatusCode as status} from "../../config/status";
import queryParamsValidation from "../../validators/queryParamsValidation";
import {fetchProjectsQuery} from "../../services/project";

export default async function (req: Request, res: Response) {

    // Validate query param
    const validQueryData = queryParamsValidation(req.body);

    if (validQueryData.status !== status.OK) {
        return res.status(validQueryData.status).send(validQueryData);
    }

    // Search the project
    const request = await fetchProjectsQuery(req.body.query);

    if (request.status !== status.OK) {
        return res.status(request.status).send(request);
    }

    res.status(status.OK).send({
        status: status.OK,
        user: request
    });

}