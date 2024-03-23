import { Injectable } from '@nestjs/common';
import { SseEvent, SseService } from '../sse/sse.service';

@Injectable()
export class OrderService {
  constructor(private sseService: SseService) {}

  createOrder() {
    const orderJsonData = {
      id: '123',
      name: 'Order 1',
    };

    const orderEvent: SseEvent = {
      data: JSON.stringify(orderJsonData),
      event: 'order_created',
      type: 'order_created',
    };

    this.sseService.send(orderEvent, 'notifications');

    return orderJsonData;
  }
}
