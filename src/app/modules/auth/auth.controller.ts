import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";


export const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await AuthService.loginUser({ email, password });

  sendResponse(res, {
    success: true,
    message: 'Logged in successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});
