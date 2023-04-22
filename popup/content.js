let transposeValue = 0;

function transposeSong(offset) {
  transposeValue += offset;
  const player = document.querySelector('#movie_player video');
  if (player) {
    player.playbackRate = 0.1;
    player.currentTime = 0;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(player);
    const soundfont = new SoundfontPlayer();
    soundfont.instrument(audioContext, 'acoustic_grand_piano').then((piano) => {
      const pitchShift = new PitchShift(audioContext);
      pitchShift.pitch = transposeValue;
      source.connect(pitchShift);
      pitchShift.connect(piano);
      piano.connect(audioContext.destination);
      player.playbackRate = 1;
    });
  }
}

const audioContext = new AudioContext();
const soundfontPlayer = new SoundfontPlayer();
const slider = document.getElementById('slider');
const sliderLabel = document.getElementById('sliderLabel');

slider.addEventListener('input', () => {
  // Get the value of the slider
  const transposeValue = parseInt(slider.value / slider.getAttribute('step'));
  sliderLabel.innerText = transposeValue;
  // Transpose the song
  soundfontPlayer.transpose(transposeValue);

  // Log the transpose value to the console
  console.log(`Transposed by ${transposeValue} semitones`);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'transpose') {
    transposeSong(message.offset);
    sendResponse();
  }
});
