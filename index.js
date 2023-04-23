const src = "https://speed.hetzner.de/1GB.bin";
const res = await fetch(src);

// instead of response.json() and other methods
const reader = res.body.getReader();

let last = 0;
let hasRead = 0;

console.log("started");

// infinite loop while the body is downloading
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  hasRead += value.length;

  if (hasRead - last > 256 * 1024) {
    last = hasRead
    console.log(`Received ${hasRead / 1024 / 1024} MB`);
  }
}
