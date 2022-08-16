import Project from "../models/Project";
import {createToken} from "./auth";
import {HttpStatusCode as status} from "../config/status";
import {projectValidation} from "../validators/projectValidators";

export function createProject(data: any) {

    const { name, owner } = data;

    // Create project
    const project = new Project({
        name: name,
        owner: owner
    });

    // Generate token for the project
    project.token = createToken(project);

    return {
        status: status.CREATED,
        data: project
    };

}

export async function saveProject(project: any) {

    try {

        const { name } = project;

        if (await projectExist(name)) {

            return {
                status: status.CONFLICT,
                message: `Project already exist with name ${name}`
            };
        }

        const data = await project.save();
        return {status: status.CREATED, data: data};

    } catch (err) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: err.message,
            error: err
        };

    }

}

export async function projectExist(name: string) {
    return Project.findOne({name: name});
}

export async function validateProject(data: any) {

    const { error } = await projectValidation.validate(data);

    if (error) {

        return {
            status: status.NOT_ACCEPTABLE,
            message: error.message,
            error: error
        };

    }

    return {
        status: status.OK,
        message: 'Project validated successfully'
    }

}

export async function deleteProjectQuery(query: object) {

    try {

        const response = await Project.deleteMany(query);

        if (response.deletedCount === 0) {
            return {
                status: status.NOT_FOUND,
                message: 'No projects deleted'
            };
        }

        return {
            status: status.OK,
            message: `${ response.deletedCount } project/s removed successfully`
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }

}

export async function fetchProjectsQuery(query: object,) {

    try {

        const response = await Project.find(query);

        if (response.length === 0) {
            return {
                status: status.NOT_FOUND,
                message: 'Project/s not found'
            };
        }

        return {
            status: status.OK,
            project: response
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }
}