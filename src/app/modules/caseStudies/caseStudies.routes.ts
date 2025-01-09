import express from 'express';
import { workController } from './caseStudies.controller';


const router = express.Router();

router.get('/', workController.getAllCaseStudies);
router.post('/', workController.createCaseStudy);
router.get('/:workId', workController.getSingleCaseStudy);
router.patch('/:workId', workController.updateCaseStudy);
router.delete('/:workId', workController.deleteCaseStudy);

export const worksRoutes = router;
