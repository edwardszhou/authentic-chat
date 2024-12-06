import { logEvents } from '@/middleware/logger';

const errorHandler = (err, req, res) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );
  console.log(err.stack); // a large message in your console that gives lots of details about error like where the error is

  const status = res.statusCode ? res.statusCode : 500; // if status code doesn't yet exist, set to 500 (server error)

  res.status(status);
  res.json({ message: err.message });
};

export default errorHandler;
