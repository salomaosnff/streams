import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream'

export function tap<T>(tapFn: (data: T) => void): Stream<T> {
  return new Transform((data: any, cb) => {
    tapFn(data)
    cb(null, data)
  })
}
