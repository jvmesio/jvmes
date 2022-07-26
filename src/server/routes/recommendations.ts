import { Router } from 'express';
import recController from '../controllers/recsController';

const recRouter = Router();

recRouter.get('/', recController.getRecommends, (req, res) => {
  return res.status(200).json(res.locals.recommends);
});

export default recRouter;