import  { Router } from 'express';
import { feedbackController } from './feedback.controller';


const router = Router();

router.get('/', feedbackController.getAllFeedback);
router.post('/', feedbackController.createFeedback);
router.get('/:id', feedbackController.getSingleFeedback);
router.patch('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

export const feedbackRoutes = router;
