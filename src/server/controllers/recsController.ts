import { RequestHandler } from 'express';
import { GET_Recommends } from '../routes/types/recommends';
import query from '../model/db';

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
  

  // TODO: Write recommends query with parameterization
  const queryString = `
    
  `;
  const values: unknown[] = [];

  try {
    const results = (await query(queryString, values)).rows;
    // TODO? Post processing of results?
    res.locals.recommends = results;
    return next();
  } catch (err) {
    console.error(err);
    return next({
      log: 'recsController.getRecommends: An error occurred querying the database',
      message: 'An error occurred retrieving recommended movies',
      status: 500
    });
  }
};

export default {
  getRecommends
};