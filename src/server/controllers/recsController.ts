import { RequestHandler } from 'express';
import { GET_Recommends } from '../routes/types/recommends';
import query from '../model/db';

// Retrieve: movie title, genre, rating, year

const QUERY_MOVIES_BY_ID = /*sql*/ `
  SELECT titles.tconst, titles."primaryTitle", titles.genres, titles."startYear" AS year, ratings."averageRating" AS rating
  FROM titles
  LEFT JOIN ratings ON ratings.tconst = titles.tconst
  WHERE titles.tconst IN ($1, $2, $3, $4)
  AND "isAdult" IS FALSE
  LIMIT 3
`;

const QUERY_TITLE_IDS_BY_NAME = /*sql*/ `
  SELECT STRING_TO_ARRAY(names."knownForTitles", ' ') AS titles
  FROM names
  WHERE names."primaryName" = $1
  ORDER BY nconst
  LIMIT 1
`;

const QUERY_MOVIES_BY_GENRE =  /*sql*/ `
  SELECT titles.tconst, titles."primaryTitle", titles.genres, titles."startYear" AS year, ratings."averageRating" AS rating
  FROM titles
  LEFT JOIN ratings ON ratings.tconst = titles.tconst
  WHERE titles.genres LIKE CONCAT('%', $1::varchar, '%')
  AND "isAdult" IS FALSE AND ratings."averageRating" IS NOT NULL
  AND "numVotes" > 250000
  ORDER BY rating DESC, year ASC
  LIMIT 3
`;

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
  

  // If actor or director, get known for titles as array
  // Then do second query to get movie info by title IDs
  // If genre, search titles table for partial string matches containing genre
  try {
    let movies;
    if (director || actor) {
      const titles = (await query(QUERY_TITLE_IDS_BY_NAME, [director || actor])).rows[0].titles;
      movies = (await query(QUERY_MOVIES_BY_ID, titles)).rows;
    }
    else if (genre) {
      movies = (await query(QUERY_MOVIES_BY_GENRE, [genre])).rows;
    }
    // console.log(movies);
    
    res.locals.recommends = movies;
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