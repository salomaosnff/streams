import { Stream } from "../lib/stream"

export function fromEvent<T>(target: any, event: any): Stream<T> {
  const stream$ = new Stream()
  const listener = (data: T) => stream$.add(data)

  if (target.on) {
    target.on(event, listener)
  } else if (target.addEventListener) {
    target.addEventListener(event, listener)
  }

  stream$.subscribe({
    onFinish () {
      if (target.off) {
        target.off(event, listener)
      } else if (target.removeEventListener) {
        target.removeEventListener(event, listener)
      }
    }
  })

  return stream$
}