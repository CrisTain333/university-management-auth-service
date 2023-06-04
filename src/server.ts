import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { errorLogger, logger } from './shared/logger';

async function fire() {
   try {
      await mongoose.connect(config.database_url as string);
      logger.info('🛢 Connected To Database');
      app.listen(config.port, () => {
         logger.info(`Server Fire in http:localhost//${config.port}`);
      });
   } catch (error) {
      errorLogger.error('Error to connect Database');
   }
}
fire();
