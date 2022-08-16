import mongoose, {Schema} from "mongoose";

const requestSchema = new Schema( {
    project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    code: { type: Number, required: true },
    message: { type: String, required: true},
    others: Schema.Types.Mixed
}, { timestamps: true })

// * Export the model and return the interface
export default mongoose.model('Request', requestSchema);