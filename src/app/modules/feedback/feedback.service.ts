import { convertArrayIdToId, convertObjectIdToId } from "../../utils";
import { IFeedback } from "./feedback.interface";
import { FeedbackModel } from "./feedback.model";


 const createFeedback = async (payload: IFeedback): Promise<IFeedback> => {
    const feedback = await FeedbackModel.create(payload)
  return feedback
};

 const getAllFeedbacks = async (): Promise<IFeedback[]> => {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
  return convertArrayIdToId(feedbacks);
};

 const getFeedbackById = async (id: string): Promise<IFeedback | null> => {
    const feedback = await FeedbackModel.findById(id).lean();
  return convertObjectIdToId(feedback);
};

 const updateFeedbackById = async (
  id: string,
  feedback: IFeedback
): Promise<IFeedback | null> => {
    const updateFeedback = await FeedbackModel.findByIdAndUpdate(id, feedback, { new: true });
  return convertObjectIdToId(updateFeedback);
};

 const deleteFeedbackById = async (id: string): Promise<IFeedback | null> => {
    const feedback = await FeedbackModel.findByIdAndDelete(id).lean();
  return convertObjectIdToId(feedback);
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};