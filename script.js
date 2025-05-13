let activeIndex = 0;
let currentMediaType = 'videos';

const videos = document.getElementsByClassName("video");
const fotos = document.getElementsByClassName("foto");
const grupoVideos = document.querySelector(".grupo-de-videos");
const grupoFotos = document.querySelector(".grupo-de-fotos");
const btnVideos = document.getElementById("btn-videos");
const btnFotos = document.getElementById("btn-fotos");

function pauseAllVideos() {
    const allVideos = document.querySelectorAll('.video video');
    allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function updateMediaStatus(nextIndex, direction) {
    if (currentMediaType === 'videos') {
        const currentMedia = videos[activeIndex];
        const nextMedia = videos[nextIndex];
        updateStatus(currentMedia, nextMedia, direction, videos);
    } else {
        const currentMedia = fotos[activeIndex];
        const nextMedia = fotos[nextIndex];
        updateStatus(currentMedia, nextMedia, direction, fotos);
    }
    activeIndex = nextIndex;
}

function updateStatus(currentMedia, nextMedia, direction, mediaCollection) {
    currentMedia.dataset.status = direction === "forward" ? "after" : "before";
    nextMedia.dataset.status = direction === "forward" ? "becoming-active-from-before" : "becoming-active-from-after";

    if (currentMediaType === 'videos') {
        const currentVideoTag = currentMedia.querySelector("video");
        const nextVideoTag = nextMedia.querySelector("video");
        
        currentVideoTag.pause();
        currentVideoTag.currentTime = 0;
    }

    setTimeout(() => {
        nextMedia.dataset.status = "active";
        if (currentMediaType === 'videos') {
            const nextVideoTag = nextMedia.querySelector("video");
            nextVideoTag.play();
        }
    }, 100);
}

function handleIrClick() {
    const mediaCollection = currentMediaType === 'videos' ? videos : fotos;
    const nextIndex = activeIndex + 1 < mediaCollection.length ? activeIndex + 1 : 0;
    updateMediaStatus(nextIndex, "forward");
}

function handleVoltarClick() {
    const mediaCollection = currentMediaType === 'videos' ? videos : fotos;
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : mediaCollection.length - 1;
    updateMediaStatus(nextIndex, "backward");
}

btnVideos.addEventListener('click', () => {
    if (currentMediaType !== 'videos') {
        pauseAllVideos();
        currentMediaType = 'videos';
        grupoVideos.style.display = 'block';
        grupoFotos.style.display = 'none';
        btnVideos.classList.add('active');
        btnFotos.classList.remove('active');
        activeIndex = 0;
        resetMediaStatus(videos);
    }
});

btnFotos.addEventListener('click', () => {
    if (currentMediaType !== 'fotos') {
        pauseAllVideos();
        currentMediaType = 'fotos';
        grupoVideos.style.display = 'none';
        grupoFotos.style.display = 'block';
        btnVideos.classList.remove('active');
        btnFotos.classList.add('active');
        activeIndex = 0;
        resetMediaStatus(fotos);
    }
});

function resetMediaStatus(mediaCollection) {
    for (let i = 0; i < mediaCollection.length; i++) {
        mediaCollection[i].dataset.status = i === 0 ? "active" : "unknown";
        if (currentMediaType === 'videos' && mediaCollection[i].querySelector('video')) {
            const video = mediaCollection[i].querySelector('video');
            if (i !== 0) {
                video.pause();
                video.currentTime = 0;
            }
        }
    }
}

document.querySelectorAll('.seletor-botões button').forEach(button => {
    button.style.webkitTapHighlightColor = 'transparent';
    button.addEventListener('touchstart', function() {
        this.classList.add('button-active');
    });
    
    button.addEventListener('touchend', function() {
        this.classList.remove('button-active');
    });
    
    button.addEventListener('touchcancel', function() {
        this.classList.remove('button-active');
    });
});