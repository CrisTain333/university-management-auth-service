import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { printf, combine, timestamp } = format;

const myFormat = printf(({ level, message, timestamp }) => {
   const date = new Date(timestamp);
   const hour = date.getHours();
   const minutes = date.getMinutes();
   const seconds = date.getSeconds();

   return `${date.toDateString()} ${hour} ${minutes} ${seconds}   ${level}: ${message}`;
});

const logger = createLogger({
   level: 'info',
   format: combine((timestamp(), myFormat)),
   transports: [
      new transports.Console(),
      new transports.File({
         filename: path.join(process.cwd(), 'logs', 'success', '%DATE%-success.log'),
         level: 'info'
      }),
      new DailyRotateFile({
         filename: '%DATE%.log',
         datePattern: 'YYYY-MM-DD-HH',
         zippedArchive: true,
         maxSize: '20m',
         maxFiles: '14d'
      })
   ]
});
export { logger };
