import mongoose, {Schema} from "mongoose";

const codeSchema = new Schema( {
    email: { type: String, required: true, unique: true},
    code: { type: Number, required: true },
    expirationDate: { type: Date, default: new Date() }
}, { timestamps: true })

codeSchema.index({expirationDate: 1},{expireAfterSeconds: 60});

// * Export the model and return the interface
export default mongoose.model('Code', codeSchema);