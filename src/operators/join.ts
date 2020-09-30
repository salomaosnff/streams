import { Stream } from "../lib/stream";
import { Transform } from "../lib/transform";

export function group(delimiter: string | RegExp): Stream<string> {
  let chunks = ''

  return new Transform((data, cb) => {
    chunks += data;
    let match
    
    while (match = chunks.match(delimiter)) {
      
      const message = chunks.substring(0, match.index ?? 0)
      chunks = chunks.substring(message.length + match[0].length)

      if (message) {
        cb(null, message)
      }
    }
  })
}