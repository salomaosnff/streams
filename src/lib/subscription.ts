export interface Subscription<T> {
  onData?(data: T): void;
  onError?(error: Error): void;
  onFinish?(): void;
  onComplete?(): void;
}