

import { CaseStudyModel } from "./caseStudies.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { ICaseStudyType } from "./caseStudies.interface";
import { convertArrayIdToId, convertObjectIdToId } from "../../utils";

 const createCaseStudy = async (data: ICaseStudyType) => {
  const work = await CaseStudyModel.create(data);
  return work
};

 const getAllCaseStudies = async () => {
  const caseStudies = await CaseStudyModel.find({}).sort({ createdAt: -1 }).lean();
  
  return convertArrayIdToId(caseStudies)
};

export const getSingleCaseStudy = async (id: string) => {
  const caseStudy = await CaseStudyModel.findById(id).lean();
  return convertObjectIdToId(caseStudy);
};

 const updateCaseStudy = async (id: string, data: ICaseStudyType) => {
  const findCaseStudy = await CaseStudyModel.findById(id);
  if (!findCaseStudy) {
    throw new AppError(httpStatus.NOT_FOUND, "Case study not found");
  }
  const caseStudy = await CaseStudyModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
  return  convertObjectIdToId(caseStudy)
};

 const deleteCaseStudy = async (id: string) => {
  const caseStudy = await CaseStudyModel.findByIdAndDelete(id).lean();
  return  convertObjectIdToId(caseStudy)
};

export const CaseStudyService = {
  createCaseStudy,
  getAllCaseStudies,
  getSingleCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
