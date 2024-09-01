const path = require('path');
const fs = require('fs');
const { MUSIC_DIRECTORY } = require('../consts');

function getFiles(filter = true) {
  const musicDirectory = path.join(__dirname, '../..', MUSIC_DIRECTORY);

  if (filter)
    return fs
      .readdirSync(musicDirectory)
      .filter((file) => file.includes('.mp3') || file.includes('.m4a'))
      .map((file) => file.slice(0, -4));
  return fs.readdirSync(musicDirectory).filter((file) => file.includes('.mp3') || file.includes('.m4a'));
}

module.exports = {
  getFiles,
};
