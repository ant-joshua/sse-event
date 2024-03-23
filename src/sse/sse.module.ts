import { Module } from '@nestjs/common';
import {SseService} from "./sse.service";

@Module({
  controllers: [],
  providers: [SseService],
  exports: [SseService],
  imports: [],
})
export class SSEModule {}
