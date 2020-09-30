import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream'

export function map<T, U>(project: (data: T, index: number) => U): Stream<T, U> {
  let index = 0;

  return new Transform((data: any, cb) => {
    cb(null, project(data, index++))
  })
}
