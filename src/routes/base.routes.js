const { Router } = require('express');
const { MUSIC_DIRECTORY } = require('../consts');
const { getFiles } = require('../lib/functions');
const path = require('path');
const fs = require('fs');

const router = Router();
const viewsDirectory = path.join(__dirname, '../..', 'public/views');

router.get('/', (_req, res) => {
  res.sendFile(path.join(viewsDirectory, 'index.html'));
});

router.get('/getSongs', (_req, res) => {
  try {
    const files = getFiles();
    return res.json(files);
  } catch (err) {
    res.status(500).json({ msg: 'error' });
    console.log(err);
  }
});

router.get('/:song', (req, res) => {
  try {
    const song = req.params['song'];

    const files = getFiles(false);

    const findFile = files.find((file) => file.includes(song));
    if (!findFile) return res.status(404).json({ msg: 'invalid_request' });

    const stream = fs.createReadStream(`./${MUSIC_DIRECTORY}/${findFile}`);
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());
  } catch (err) {
    res.status(500).json({ msg: 'error' });
    console.log(err);
  }
});

module.exports = router;
