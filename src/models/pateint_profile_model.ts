import { Schema, Document, model,Model } from "mongoose";
import { IUser } from "./user_model";
import { IRehabCenter } from "./rehabcenter_model";

export interface IPatient extends Document {
    patient_id: number;
    patient_name: string;
    cnic: string;
    years_of_addiction: number;
    drugs_used: string[];
    verification_status: string;
    user: IUser['_id'];
    approvedRehabcenters?: IRehabCenter;
}

// Define the Mongoose schema
const patientSchema = new Schema<IPatient>({
    patient_id: {
        type: Number,
        unique: true
    },
    patient_name: {
        type: String,
        required: true
    },
    years_of_addiction: {
        type: Number,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^\d{13}$/.test(v);
            },
            message: props => `${props.value} is not a valid CNIC number. It should be a 13-digit number.`
        }
    },
    drugs_used: {
        type: [String],
        required: true
    },
    verification_status: {
        type: String,
        default: "pending" // Set default value to "pending"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    },
    approvedRehabcenters: {
        type: Object,
        default: null
    }
},
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    });

// Pre-save hook to handle auto-incrementing of patient_id
patientSchema.pre<IPatient>('save', async function (next) {
    if (!this.patient_id) {
        const ModelType = this.constructor as Model<IPatient>;
        const lastPatient = await ModelType.findOne({}, {}, { sort: { 'patient_id': -1 } });
        this.patient_id = lastPatient ? lastPatient.patient_id + 1 : 1;
    }
    next();
});

const Patient = model<IPatient>('Patient', patientSchema);
export default Patient;
