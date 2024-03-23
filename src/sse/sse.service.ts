import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

export interface SseEvent {
  data: string;
  event?: string;
  type?: string;
  id?: string;
  retry?: number;
}

@Injectable()
export class SseService {
  private eventStreams: Map<string, Subject<SseEvent>> = new Map();

  send(event: SseEvent, name?: string) {
    if (name) {
      const stream = this.eventStreams.get(name);
      if (stream) {
        stream.next(event);
      }
    } else {
      this.sendAll(event);
    }
  }

  getObservable(name?: string): Observable<SseEvent> {
    const stream = new Subject<SseEvent>();
    if (name) {
      this.eventStreams.set(name, stream);
    }
    return stream.asObservable();
  }

  register(name?: string) {
    const stream = new Subject<SseEvent>();
    if (name) {
      this.eventStreams.set(name, stream);
    }

    stream.subscribe({
      next: (event) => {
        console.log(event);
      },
      error: () => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      },
    });

    return this.getObservable(name);
  }

  private sendAll(event: SseEvent) {
    this.eventStreams.forEach((stream) => {
      stream.next(event);
    });
  }
}
