import { Stream } from "./stream"

export class Transform<W, R = W> extends Stream<W, R> {

  constructor(private transformFn: (data: W, cb: (err: Error | null, data: R | null) => void) => R | void) {
    super()
  }

  add(data: W | null) {
    if (this.closed) return this;
    if (data !== null) {
      this.transformFn(data, (error, data) => {
        if (error) return this.error(error)
        else return super.add(data as any)
      })
      return this
    }
    
    return super.add(data)
  }
}