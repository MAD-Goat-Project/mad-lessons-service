import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_NAME } from '../../utils/constants';

@Injectable()
export class RabbitMQService {
  constructor(@Inject(RMQ_NAME) private readonly client: ClientProxy) {}

  public send(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }
}
