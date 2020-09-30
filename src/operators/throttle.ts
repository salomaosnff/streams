import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream'

export function throttle<T>(time = 500): Stream<T> {
  let lastTime = 0

  return new Transform((data, cb) => {
    const now = performance.now()

    if (lastTime + time <= now) {
      cb(null, data as any)
      lastTime = now
    }
  })
}
