const fs = require('fs');

try {
  const shows = [];

  // read contents of the file
  const data = fs.readFileSync('input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    // Remove empty lines
    if (line === '') return;

    // Since the copy and paste will bring also the image
    // You might have repeated lines. Avoid those.
    if (shows.indexOf(line) > -1) return

    shows.push(line);
  });

  // eslint-disable-next-line no-console
  console.log(shows);

  // Save output
  const content = new Date();

  fs.writeFile('output.html', content, err => {
    if (err) {
      console.error(err)
      return
    }
    // eslint-disable-next-line no-console
    console.log('Output saved successfully!')
  })
} catch (err) {
    console.error(err);
}