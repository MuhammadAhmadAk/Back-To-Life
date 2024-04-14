import mongoose, { Schema, Document } from 'mongoose';
import { IPatient } from './pateint_profile_model';

export interface IRehabCenter extends Document {
    id: number,
    centerName: string,
    location: string,
    treatmentOffered: string[],
    approved_profiles: mongoose.Types.ObjectId[];
}

// Declare the Schema of the Mongo model
var RehabSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    centerName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    treatmentOffered: {
        type: [String],
        required: true
    },
    approved_profiles: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Patient' }],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

// Pre-save middleware to generate a 6-digit unique rehabId
RehabSchema.pre<IRehabCenter>('save', async function (next) {
    if (!this.isNew) {
        return next(); // If not a new document, move on
    }

    // Generate a 6-digit unique rehabId
    const RehabCenterModel = mongoose.model<IRehabCenter>('RehabCenter');
    const existingRehabsCount = await RehabCenterModel.countDocuments({});
    const newRehabId = Math.floor(0 + existingRehabsCount + 1); // Start from 1
    this.id = newRehabId;
    next();
});

//Export the model
const RehabCenter = mongoose.model<IRehabCenter>('RehabCenter', RehabSchema);
export default RehabCenter;
