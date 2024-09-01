const baseUrl = 'http://localhost:3000';
let currentSongIndex;
let songs = [];
let nextSong = 0;

let songBoxes;

const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener(
  'ended',
  () => {
    if (songs.length + 1 >= nextSong) {
      playSong(songs[nextSong]);
    }
  },
  false
);

window.addEventListener('resize', () => {
  const audioBox = document.getElementById('audio-box');
  const widthScreen = window.innerWidth;

  if (widthScreen >= 768) {
    audioBox.style.bottom = '0px';
  }
});

function toggleAudioBox() {
  const audioBox = document.getElementById('audio-box');
  const toggled = audioBox.getAttribute('data-toggled');
  const widthScreen = window.innerWidth;

  if (widthScreen >= 768) {
    if (!toggled || toggled == 'false') {
      audioBox.setAttribute('data-toggled', 'true');
      audioBox.style.right = `-${audioBox.offsetWidth - 80}px`;
      return;
    }

    audioBox.setAttribute('data-toggled', 'false');
    audioBox.style.right = `0px`;
  } else {
    if (!toggled || toggled == 'false') {
      audioBox.setAttribute('data-toggled', 'true');
      audioBox.style.bottom = `-${audioBox.offsetHeight - 60}px`;
      return;
    }

    audioBox.setAttribute('data-toggled', 'false');
    audioBox.style.bottom = `0px`;
  }
}

document.getElementById('toggle-audio-box').addEventListener('click', (elem) => {
  toggleAudioBox();
});

function playSong(song) {
  currentSongIndex = songs.indexOf(song);

  const apiUrl = `${baseUrl}/${song}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => {
      const audioBoxElement = document.getElementById('audio-box');

      if (audioBoxElement.classList.contains('hidden')) audioBoxElement.classList.remove('hidden');

      const url = URL.createObjectURL(blob);
      audioPlayer.src = url;
      audioPlayer.play();

      nextSong = currentSongIndex + 1;

      setCurrentSongStyle();

      const nextSongElem = document.getElementById('nextSong');
      document.getElementById('currentSong').textContent = `Playing now: ${song}`;
      if (songs[nextSong]) {
        nextSongElem.textContent = `Next song: ${songs[nextSong]}`;
      } else {
        nextSongElem.textContent = 'End reproduction';
      }

      const audioBoxToggled = audioBoxElement.getAttribute('data-toggled');
      if (audioBoxToggled == 'true' && window.innerWidth >= 768) {
        audioBoxElement.style.right = `-${audioBoxElement.offsetWidth - 80}px`;
      } else {
        audioBoxElement.style.right = '0px';
      }
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  toggleAudioBox();

  fetch(`${baseUrl}/getSongs`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      songs = await response.json();

      const songsElement = document.getElementById('songs');

      songs.map((song, index) => {
        songsElement.innerHTML += `                          
                  <div class='song-box' data-song='${song}'>
                    <span>${index + 1}. ${song}</span>
                    <button data-song="${song}" class="btn-play-song">▶ Play</button>
                  </div>
                  `;
      });

      document.getElementById('songs-title').textContent = `${songs.length} songs`;

      document.querySelectorAll('.btn-play-song').forEach((btn) => {
        btn.addEventListener('click', () => {
          playSong(btn.dataset.song);
        });
      });

      songBoxes = document.querySelectorAll('.song-box');
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});

function setCurrentSongStyle() {
  songBoxes.forEach((songBox, index) => {
    if (index == currentSongIndex) {
      songBox.classList.add('song-box-current');

      // button
      songBox.children[1].textContent = 'Playing';
    } else {
      if (songBox.classList.contains('song-box-current')) {
        songBox.classList.remove('song-box-current');

        // button
        songBox.children[1].textContent = '▶ Play';
      }
    }
  });
}
