import mongoose, {Schema} from "mongoose";

const ownerSchema = new Schema( {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true, default: false },
    password: { type: String, required: true, select: false }
}, { timestamps: true });

ownerSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

// * Export the model and return the interface
export default mongoose.model('Owner', ownerSchema);