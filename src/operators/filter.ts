import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream'

export function filter<T>(filterCb: (data: T) => boolean): Stream<T> {
  return new Transform((data: any, cb) => {
    if (filterCb(data)) {
      cb(null, data)
    }
  })
}
