import { Router } from 'express';

import { feedbackRoutes } from '../modules/feedback/feedback.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { worksRoutes } from '../modules/caseStudies/caseStudies.routes';
import { heroRoutes } from '../modules/hero/hero.routes';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/hero',
    route: heroRoutes,
  },
  {
    path: '/works',
    route: worksRoutes,
  },
  {
    path: '/feedbacks',
    route: feedbackRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
