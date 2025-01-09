import { model, Schema } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>({
  feedback: { type: String, required: true },
  logo: { type: String, required: true },
  logoName: { type: String, required: true },
  companyName: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export const FeedbackModel = model<IFeedback>('Feedback', feedbackSchema);

