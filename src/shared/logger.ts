import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { printf, combine, timestamp } = format;

const myFormat = printf(({ level, message }) => {
   const date = new Date();
   const hour = date.getHours();
   const minutes = date.getMinutes();
   const seconds = date.getSeconds();

   return `${date.toDateString()}  ${hour}:${minutes}:${seconds}  ${level}: ${message}`;
});

const logger = createLogger({
   level: 'info',
   format: combine((timestamp(), myFormat)),
   transports: [
      new transports.Console(),
      new DailyRotateFile({
         filename: path.join(process.cwd(), 'logs', 'success', '%DATE%-success.log'),
         datePattern: 'YYYY-MM-DD-HH',
         zippedArchive: true,
         maxSize: '20m',
         maxFiles: '14d'
      })
   ]
});

const errorLogger = createLogger({
   level: 'error',
   format: combine((timestamp(), myFormat)),
   transports: [
      new transports.Console(),
      new DailyRotateFile({
         filename: path.join(process.cwd(), 'logs', 'error', '%DATE%-error.log'),
         datePattern: 'YYYY-MM-DD-HH',
         zippedArchive: true,
         maxSize: '20m',
         maxFiles: '14d'
      })
   ]
});
export { logger, errorLogger };
