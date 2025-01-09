import httpStatus from "http-status";
import { HeroService } from "./hero.service";
import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";



const addHeroContent = catchAsync(async (req: Request, res: Response) => {
    const hero = await HeroService.addHeroContent(req.body);
    sendResponse(res, {
        success: true,
        message: 'Hero content added successfully',
        statusCode: httpStatus.CREATED,
        data: hero,
    });
});

const updateHeroContent = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const hero = await HeroService.updateHeroContent(id, req.body);
    sendResponse(res, {
        success: true,
        message: 'Hero content updated successfully',
        statusCode: httpStatus.OK,
        data: hero,
    });
});

const fetchHeroContent = catchAsync(async (req: Request, res: Response) => {
    const hero = await HeroService.fetchHeroContent();
    sendResponse(res, {
        success: true,
        message: 'Hero content fetched successfully',
        statusCode: httpStatus.OK,
        data: hero,
    });
});

export const HeroController = { 
    addHeroContent,
    updateHeroContent,
    fetchHeroContent
};