import { format } from 'date-fns';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

// DO I NEED TO DO THIS EVERY TIME I WANT TO USE DIRNAME?
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // gets filename of server.js manually (es module)
const __dirname = path.dirname(__filename); // gets parent directory of server.js (es module)

// Async function used by 'logger' function below that will make a 'logs' folder in your local directory if it does not already exist, and
// add a .log file into it with info about the most recent request made to the server
const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // \t tabs make it easy for future import into Excel
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// A middleware function designed to be executed every time there is a new request made to the server
// Records method (GET, POST, etc.), the URL being requested (?), and the scheme/hostname/port the request is made from
const logger = function (req, res, next) {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
