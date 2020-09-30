import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream';

const send = Symbol('send')

export function last<T>(): Stream<T> {
  let last: T | null = null

  const stream$ = new Transform<T | symbol>((data, cb) => {
    if (data === send) {
      cb(null, last as T)
      stream$.closed = true
    }

    last = data as T;
  })

  stream$.subscribe({
    onComplete(){
      stream$.closed = false
      stream$.add(send)
    }
  })

  return stream$
}
