const res = await fetch("http://hgd-speedtest-1.tele2.net/100GB.zip");

// instead of response.json() and other methods
const reader = res.body.getReader();

let last = 0;
let hasRead = 0;

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

