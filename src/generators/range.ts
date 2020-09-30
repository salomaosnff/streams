import { Stream } from '../lib/stream'

export function range(start = 0, end = 10, useAsync = true) {
  
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new Error(`start and end should be a finite number.`)
  }

  const stream = new Stream<number>()

  if (useAsync) {
    for (let i = start; i < end; i++) {
      requestAnimationFrame(() => stream.add(i))
    }
  
    requestAnimationFrame(() => stream.add(null))
  }

  return stream
}
