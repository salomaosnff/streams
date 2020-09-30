import { Subscription } from "./subscription";


function createPromise<T>() {
  const def = {} as any

  def.promise = new Promise<T>((resolve, reject) => {
    def.resolve = resolve
    def.reject = reject
  })

  return def as {
    promise: Promise<T>
    resolve: (value: T) => void
    reject: (error: Error) => void
  }
}

export class Stream<W, R = W> implements AsyncIterator<R> {
  private _subscriptions = new Set<Subscription<R>>()
  private _pipes = new Map<Stream<any, any>, Subscription<R>>()

  closed = false;
  destroyed = false;
  done = false;

  add(data: W | null) {
    if (this.closed) return this;
    if (data === null) {
      this.done = true
      this.closed = true
      
      for (const sub of this._subscriptions) {
        if (sub.onComplete) sub.onComplete()
        if (sub.onFinish) sub.onFinish()
      }
      
      this.destroy()
    } else {
      for (const sub of this._subscriptions) {
        if (sub.onData) sub.onData(data as any)
      }
    }

    return this
  }

  error(error: Error) {
    if (this.closed) return this;

    this._subscriptions.forEach(sub => {
      if (sub.onError) sub.onError(error)
    })

    return this
  }

  pipe<T>(stream: Stream<R, T>, close = true): Stream<R, T> {
    if (stream.destroyed) {
      throw new Error('Could not pipe, target stream is destroyed!')
    }
    const onData = (data: R) => stream.add(data)
    const onFinish = () => stream.add(null)

    const sub = this.subscribe({
      onData,
      onFinish: close ? onFinish : undefined
    })

    this._pipes.set(stream, sub)

    return stream
  }

  unpipe(stream: Stream<W, R>) {
    const sub = this._pipes.get(stream)

    if (!sub) return;

    this._subscriptions.delete(sub)
    this._pipes.delete(stream)
  }

  subscribe(sub: Subscription<R>) {
    this._subscriptions.add(sub)
    return sub
  }

  unsubscribe(sub: Subscription<R>) {
    this._subscriptions.delete(sub)
  }

  destroy() {
    this.closed = true;
    this.destroyed = true;

    this._pipes.clear()
    this._subscriptions.clear()
  }

  toPromise() {
    return new Promise<R>((resolve, reject) => {
      const sub = this.subscribe({
        onError: reject,
        onData: async (data) => {
          this.unsubscribe(sub)
          setTimeout(resolve, 0, data)
        }
      })
    })
  }

  async * toIterator () {
    while (!this.done) {
      const value = await this.toPromise()
      yield value;
    }
  }

  [Symbol.asyncIterator] () {
    return this.toIterator()
  }
}