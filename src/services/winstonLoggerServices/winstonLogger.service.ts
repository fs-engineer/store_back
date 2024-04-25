import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

@Injectable()
export class WinstonLoggerService implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info', // Уровень логирования
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new LokiTransport({
                    host: 'http://localhost:3100', // URL вашего Loki сервера
                    json: true,
                    labels: { application: 'server' }, // Настройка лейблов для Loki
                }),
                new winston.transports.Console(), // Вывод логов также в консоль
            ],
        });
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string, trace: string) {
        this.logger.error(message, { trace });
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }
}
