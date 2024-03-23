import { Body, Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';
import { SseEvent, SseService } from './sse/sse.service';
import { Response, response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sseService: SseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('notifications')
  notificationSse(): Observable<any> {
    return this.sseService.register('notifications');
    // return interval(1000).pipe(map(() => ({ data: { message: 'hallo' } })));
  }

  @Post('send')
  sendNotification(@Res() res: Response, @Body() payload: any) {
    const event: SseEvent = {
      data: payload,
      event: 'testing_event',
      type: 'testing_event',
    };

    this.sseService.send(event, 'notifications');

    return res.json({
      message: 'Notification sent',
      data: payload,
    });
  }
}
