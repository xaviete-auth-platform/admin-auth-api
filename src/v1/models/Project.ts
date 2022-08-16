import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema( {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    token: { type: String, required: true },
    settings: Schema.Types.Mixed
}, { timestamps: true })

// * Export the model and return the interface
export default mongoose.model('Project', projectSchema);