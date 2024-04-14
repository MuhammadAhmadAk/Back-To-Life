"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const patientSchema = new mongoose_1.Schema({
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
            validator: function (v) {
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    },
    approvedRehabcenters: {
        type: Object,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
});
// Pre-save hook to handle auto-incrementing of patient_id
patientSchema.pre('save', async function (next) {
    if (!this.patient_id) {
        const ModelType = this.constructor;
        const lastPatient = await ModelType.findOne({}, {}, { sort: { 'patient_id': -1 } });
        this.patient_id = lastPatient ? lastPatient.patient_id + 1 : 1;
    }
    next();
});
const Patient = (0, mongoose_1.model)('Patient', patientSchema);
exports.default = Patient;
