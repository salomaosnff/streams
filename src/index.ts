import { range, interval, fromEvent } from "./generators"
import { map } from "./operators";

async function main () {
  const mouse$ = fromEvent<MouseEvent>(document, 'mousemove');
}

main()