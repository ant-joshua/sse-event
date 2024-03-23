import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SseService } from './sse/sse.service';
import {OrderModule} from "./order/order.module";
import {SSEModule} from "./sse/sse.module";

@Module({
  imports: [OrderModule,SSEModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
