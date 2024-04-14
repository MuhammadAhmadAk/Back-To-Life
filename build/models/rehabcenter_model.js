"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Declare the Schema of the Mongo model
var RehabSchema = new mongoose_1.default.Schema({
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
        type: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Patient' }],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});
// Pre-save middleware to generate a 6-digit unique rehabId
RehabSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next(); // If not a new document, move on
    }
    // Generate a 6-digit unique rehabId
    const RehabCenterModel = mongoose_1.default.model('RehabCenter');
    const existingRehabsCount = await RehabCenterModel.countDocuments({});
    const newRehabId = Math.floor(0 + existingRehabsCount + 1); // Start from 1
    this.id = newRehabId;
    next();
});
//Export the model
const RehabCenter = mongoose_1.default.model('RehabCenter', RehabSchema);
exports.default = RehabCenter;
