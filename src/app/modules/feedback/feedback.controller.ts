import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeedbackService } from './feedback.service';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { uploadImage } from '../../utils/uploadImage';


export const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
    const feedbacks = await FeedbackService.getAllFeedbacks();
    sendResponse(res, {
        success: true,
        message: 'Feedbacks retrieved successfully',
        statusCode: httpStatus.OK,
        data: feedbacks,
    });
});

export const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const feedback = await FeedbackService.getFeedbackById(id);
    if (!feedback) {
        throw new AppError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    sendResponse(res, {
        success: true,
        message: 'Feedback retrieved successfully',
        statusCode: httpStatus.OK,
        data: feedback,
    });
});

export const createFeedback = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const file = req.files;
    let logo = '';
    if (file) {
        const images = await uploadImage(file);
        logo = images[0];
    }
    const newFeedback = await FeedbackService.createFeedback({ ...data, logo });
    sendResponse(res, {
        success: true,
        message: 'Feedback created successfully',
        statusCode: httpStatus.CREATED,
        data: newFeedback,
    });
});

export const updateFeedback = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const updatedFeedback = await FeedbackService.updateFeedbackById(id, data);
    sendResponse(res, {
        success: true,
        message: 'Feedback updated successfully',
        statusCode: httpStatus.OK,
        data: updatedFeedback,
    });
});

export const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await FeedbackService.deleteFeedbackById(id);
    sendResponse(res, {
        success: true,
        message: 'Feedback deleted successfully',
        statusCode: httpStatus.NO_CONTENT,
        data: null,
    });
});
export const feedbackController = {
    getAllFeedback,
    getSingleFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback,
}
