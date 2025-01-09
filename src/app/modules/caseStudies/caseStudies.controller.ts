

import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

import AppError from '../../error/AppError';
import { uploadImage } from '../../utils/uploadImage';
import { CaseStudyService } from './caseStudies.service';

const getAllCaseStudies = catchAsync(async (req: Request, res: Response) => {
  
  const caseStudies = await CaseStudyService.getAllCaseStudies();
  console.log(caseStudies)
  sendResponse(res, {
    success: true,
    message: 'Case studies retrieved successfully',
    statusCode: httpStatus.OK,
    data: caseStudies,
  });
});

const getSingleCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const { workId } = req.params;
  const caseStudy = await CaseStudyService.getSingleCaseStudy(workId);
  if (!caseStudy) {
    throw new AppError(httpStatus.NOT_FOUND, 'Case study not found');
  }
  sendResponse(res, {
    success: true,
    message: 'Case study retrieved successfully',
    statusCode: httpStatus.OK,
    data: caseStudy,
  });
});

const createCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const files = req.files;
  const tags = req.body.tags;

  let image = '';
  if (files) {
    const images = await uploadImage(files);
    image = images[0];
  }
  const newCaseStudy = await CaseStudyService.createCaseStudy({ ...data , tags: tags.split(','), image });
  sendResponse(res, {
    success: true,
    message: 'Case study created successfully',
    statusCode: httpStatus.CREATED,
    data: newCaseStudy,
  });
});

const updateCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const { workId } = req.params;

  const data = req.body;
  const updatedCaseStudy = await CaseStudyService.updateCaseStudy(workId, data);
  sendResponse(res, {
    success: true,
    message: 'Case study updated successfully',
    statusCode: httpStatus.OK,
    data: updatedCaseStudy,
  });
});

const deleteCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const { workId } = req.params;
  await CaseStudyService.deleteCaseStudy(workId);
  sendResponse(res, {
    success: true,
    message: 'Case study deleted successfully',
    statusCode: httpStatus.NO_CONTENT,
    data : null
  });
});

export const workController = {
  getAllCaseStudies,
  getSingleCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};

