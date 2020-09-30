import { Stream } from '../lib/stream'

export function of<T>(...data: T[]): Stream<T> {
  const stream = new Stream<T>()

  window.setTimeout(() => {
    for (const value of data) {
      stream.add(value)
    }

    stream.add(null)
  })

  return stream
}
