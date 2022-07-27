import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

/// App initialization
const app = express();
const PORT = 3000;

/*
 * Parsing request body
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/test', (req, res) => {
  // res.status(201).send('Hello');
});

/* handle requests for static files - von styling */
app.use('/build', express.static(path.join(__dirname, '../build')));


/// Catch-all requests
app.all('*', (req, res) => {
  console.log('Page not found');
  return res.status(404).send('Page not found. Click <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">here</a> for more information.');
});


/// Global error handler
const globalErrorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log : 'Express error handler caught unknown middleware error',
    status : 400,
    message : { err: 'An error occured'}
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
};
app.use(globalErrorHandler);

/// Begin listening
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});