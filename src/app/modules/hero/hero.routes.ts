import express from 'express';
import { HeroController } from './hero.controller';

const router = express.Router();
router.get('/', HeroController.fetchHeroContent);
router.post('/', HeroController.addHeroContent);
router.patch('/:id', HeroController.updateHeroContent);

export const heroRoutes = router;
