import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream';

export function take<T>(count: number): Stream<T> {
  const stream$: Transform<T> = new Transform((data, cb) => {
    if (count-- > 0) {
      cb(null, data)
      if (count == 0) {
        stream$.add(null)
      }
    }
  })

  return stream$
}
