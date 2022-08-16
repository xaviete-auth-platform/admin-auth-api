import {Request, Response} from "express";
import {HttpStatusCode as status} from "../../config/status";
import {createProject, saveProject, validateProject} from "../../services/project";

export default async function (req: Request, res: Response) {

    // Validate project data
    const validate = await validateProject(req.body);

    if (validate.status !== status.OK) {
        return res.status(validate.status).json(validate);
    }

    // Create object project
    const project = createProject(req.body);

    if (project.status !== status.CREATED) {
        return res.status(project.status).send(project);
    }

    // Save project
    const response = await saveProject(project.data);

    // Handle response
    if (response.status !== status.CREATED) {
        return res.status(response.status).send(response);
    }

    res.status(status.CREATED).send({status: status.CREATED, project: response.data});

}