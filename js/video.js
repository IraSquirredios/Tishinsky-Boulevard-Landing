const videoButton = document.querySelector('.respectability__video-play');
const videoDialog = document.querySelector('#project-video');
const videoPlayer = videoDialog.querySelector('video');
const closeVideoButton = videoDialog.querySelector('.video-dialog__close');
const backgroundVideo = document.querySelector('.respectability__video');
let backgroundWasPlaying = false;

videoButton.addEventListener('click', () => {
  backgroundWasPlaying = !backgroundVideo.paused;
  backgroundVideo.pause();
  videoDialog.showModal();
  document.body.classList.add('video-open');
  // Playback can be blocked by the browser. Native controls remain available.
  videoPlayer.play().catch(() => {});
});

closeVideoButton.addEventListener('click', () => {
  videoDialog.close();
});

videoDialog.addEventListener('click', (event) => {
  const bounds = videoDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === videoDialog && outside) videoDialog.close();
});

// Both Escape and the close button trigger this event.
videoDialog.addEventListener('close', () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  document.body.classList.remove('video-open');
  if (backgroundWasPlaying) backgroundVideo.play().catch(() => {});
  videoButton.focus({ preventScroll: true });
});
