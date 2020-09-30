import { Stream } from '../lib/stream'

export function interval(period = 1000): Stream<number> {
  let i = 0;

  const stream = new Stream<number>()
  const interval = setInterval(() => stream.add(i++), period)

  stream.subscribe({
    onFinish: () => clearInterval(interval)
  })

  return stream
}
