const path = require('path');
const fs = require('fs');
const { MUSIC_DIRECTORY } = require('../consts');

function getFiles(filter = true) {
  const musicDirectory = path.join(__dirname, '../..', MUSIC_DIRECTORY);

  if (filter) return fs.readdirSync(musicDirectory).map((file) => file.slice(0, -4));
  return fs.readdirSync(musicDirectory);
}

module.exports = {
  getFiles,
};
