import { Module } from '@nestjs/common';
import {OrderService} from "./order.service";
import {SSEModule} from "../sse/sse.module";
import {OrderController} from "./order.controller";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
  imports: [SSEModule],
})
export class OrderModule {}
