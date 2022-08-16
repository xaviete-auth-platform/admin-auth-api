import Owner from "../models/Owner";
import {HttpStatusCode as status} from "../config/status";
import Project from "../models/Project";

export async function updateByQuery(query: object, data: object, model: string) {

    try {

        let response;

        if (model === 'owner') {
            response = await Owner.updateMany(query, {$set: data});
        } else if (model === 'project') {
            response = await Project.updateMany(query, {$set: data});
        } else {

            return {
                status: status.INTERNAL_SERVER_ERROR,
                message: 'Invalid model'
            }

        }

        if (!response.acknowledged || response.modifiedCount === 0) {
            return {
                status: status.OK,
                message: 'No owners updated'
            }
        }

        return {
            status: status.OK,
            message: `${response.modifiedCount} items updated successfully`
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }





}