import { Transform } from '../lib/transform'
import { Stream } from '../lib/stream'

export function debounce<T>(time = 500): Stream<T> {
  let timer: any

  return new Transform((data, cb) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(null, data), time)
  })
}
