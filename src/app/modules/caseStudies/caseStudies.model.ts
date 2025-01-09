import { model, Schema } from "mongoose";
import { ICaseStudyType } from "./caseStudies.interface";



export const caseStudyTypeSchema = new Schema<ICaseStudyType>({
    image: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
}, { timestamps: true, versionKey: false });
export const CaseStudyModel = model<ICaseStudyType>('CaseStudies', caseStudyTypeSchema);
