const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'playlists.js');
let content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf('];') + 1;
const arrayString = content.substring(startIdx, endIdx);

let playlists;
try {
  playlists = eval(arrayString);
} catch (e) {
  console.error("Error evaluating arrayString:", e);
  process.exit(1);
}

playlists.forEach(pl => {
  if (pl.songs && pl.songs.length > 6) {
    pl.songs = pl.songs.slice(0, 6);
  }
});

const newContent = 'const playlists = ' + JSON.stringify(playlists, null, 2) + ';\n\nexport default playlists;\n';

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Playlists truncated to 6 songs each.");
