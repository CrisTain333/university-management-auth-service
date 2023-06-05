import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

async function fire() {
    let server: Server;

    try {
        await mongoose.connect(config.database_url as string);
        logger.info('🛢 Connected To Database');
        server = app.listen(config.port, () => {
            logger.info(`Server Fire in http:localhost//${config.port}`);
        });
    } catch (error) {
        errorLogger.error('Error to connect Database');
    }

    process.on('unhandledRejection', (error) => {
        console.log('Unhandled Rejection is Detected, we are closing the server .....');
        if (server) {
            server.close(() => {
                errorLogger.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}
fire();
