import { RequestHandler } from 'express';
import { GET_Recommends } from '../routes/types/recommends';

/**
 * Gets movie recommendations based on one or more of: genre, actor, or director.
 * Stores result as an array of movie objects into res.locals.recommends
 */
const getRecommends: RequestHandler = async (req, res, next) => {
  const { genre, actor, director } = req.query as GET_Recommends['query'];
  if (!genre && !actor && !director) return next({
    log: 'recommendations.getRecommends: At least one search parameter must be specified',
    message: 'At least one search parameter must be specified',
    status: 400
  });

  // TODO: Write recommends query and store array of objects into res.locals.recommends
  // DEBUG - Remove below line once query is written / executed and invokes next()
  return next();
};

export default {
  getRecommends
};