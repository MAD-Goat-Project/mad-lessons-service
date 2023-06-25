import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RMQ_NAME } from '../../utils/constants';
import { RabbitMQService } from './rabbit-mq.provider.service';

@Module({
  providers: [RabbitMQService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: RMQ_NAME,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            queue: configService.get<string>('RMQ_PRODUCER_QUEUE'),
            urls: [configService.get<string>('RMQ_PRODUCER_URL')],
            queueOptions: {
              durable: configService.get<boolean>('RMQ_PRODUCER_QUEUE_DURABLE'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [RabbitMQService],
})
export class RabbitMqProviderModule {}
