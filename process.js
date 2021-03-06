const date = require('./utils/date.js');

const fs = require('fs');

try {
  const skipLines = [
    '',
    'All',
    'Recently watched'
  ]
  let shows = [];

  // read contents of the file
  const data = fs.readFileSync('input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    // Skip certain lines
    if (skipLines.indexOf(line.trim()) > -1) return;

    // Since the copy and paste will bring also the image
    // You might have repeated lines. Avoid those.
    if (shows.indexOf(line.trim()) > -1) return

    shows.push(line.trim());
  });

  // Save output
  let content = '';

  const dateOptions = {
    month: 'long',
  };

  content += `<p><small>Updated: ${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date())} ${date.formatNumber(new Date().getDate())}, ${new Date().getFullYear()}</small></p>`;
  content += "\n\n";
  content += "<h3>🍿 Recently Watched</h3>";
  content += "\n\n";
  content += "<ul>";
    for (let i = 0, len = shows.length; i < len; i++) {
      if (shows[i] === 'All shows') {
        content += "\n";
        content += "</ul>";
        content += "\n\n";
        content += "<h3>📺 All Shows</h3>";
        content += "\n\n";
        content += "<ul>";
      } else {
        content += "\n";
        content += ` <li><a rel="nofollow" title="Search on IMDB...." href="http://imdb.com/find?q=${shows[i]}">${shows[i]}</a></li>`;
      }
    }
  content += "\n";
  content += "</ul>";
  content += "\n\n";
  content += '<p><small>Generated by <a href="https://github.com/quicoto/tvtime-parser">TV Time parser</a></small>';


  console.log(content);
} catch (err) {
    console.error(err);
}