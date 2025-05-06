let activeIndex = 0;

const videos = document.getElementsByClassName("video");

function updateVideoStatus(nextIndex, direction) {
  const currentVideo = videos[activeIndex];
  const nextVideo = videos[nextIndex];

  // Define o status de saída e entrada
  currentVideo.dataset.status = direction === "forward" ? "after" : "before";
  nextVideo.dataset.status = direction === "forward" ? "becoming-active-from-before" : "becoming-active-from-after";

  // Pausa o vídeo atual e reinicia o próximo
  const currentVideoTag = currentVideo.querySelector("video");
  const nextVideoTag = nextVideo.querySelector("video");

  currentVideoTag.pause();
  currentVideoTag.currentTime = 0;

  setTimeout(() => {
    nextVideo.dataset.status = "active";
    nextVideoTag.play();
    activeIndex = nextIndex;
  }, 100);
}

function handleIrClick() {
  const nextIndex = activeIndex + 1 < videos.length ? activeIndex + 1 : 0;
  updateVideoStatus(nextIndex, "forward");
}

function handleVoltarClick() {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : videos.length - 1;
  updateVideoStatus(nextIndex, "backward");
}

