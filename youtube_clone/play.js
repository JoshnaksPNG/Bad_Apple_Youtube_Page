const VID_X = 4;
const VID_Y = 3;

const FRAMERATE = 33; /** FPS */
const FRAME_INTERVAL = 1000 / FRAMERATE;
const FRAME_COUNT = 6955;

/** number of preloaded frames */
const PRELOAD_AHEAD = 2;

const FILE_PATH = "../frame_output/frame_parts";

/** current frame */
let frame = 0;
let lastTime = performance.now();

const thumbs = document.querySelectorAll(".thumbnail-img");
const channels = document.querySelectorAll(".author-img");

const imageCache = new Map();

let stopped = true;
let paused = false;

/* ================== VIDEO MANAGEMENT ================== */

function startVideo() {

    if (!stopped) {

        console.log("The video is not stopped");
        return;
    }

    console.log("Video has been started");
    stopped = false;
    lastTime = performance.now();
    preloadFrame(0);
    requestAnimationFrame(loop);
}

function pauseVideo() {

    if (stopped || paused) {

        console.log("The video has not started yet");
        return;
    }

    console.log("Video has been paused");
    paused = true;
}

function resumeVideo() {

    if (!paused) {

        console.log("The video is not on pause");
        return;
    }

    console.log("Video has been resumed");
    paused = false;
    lastTime = performance.now();
    requestAnimationFrame(loop);
}

function stopVideo() {

    if (stopped) {

        console.log("The video has already been stopped");
        return;
    }

    console.log("Video has been stopped");
    stopped = true;
    paused = false;
    frame = 0;
}

/* ================== IMAGE HELPERS ================== */

function preloadFrame(frameNumber) {

    if (frameNumber >= FRAME_COUNT) return;

    for (let i = 0; i < VID_X; i++) {

        for (let j = 0; j < VID_Y; j++) {

            const base = `${FILE_PATH}/${frameNumber + 1}/${j},${i}`;

            for (const type of ["thumb", "channel"]) {

                const src = `${base}${type}.jpg`;

                if (imageCache.has(src)) continue;

                const img = new Image();
                img.src = src;
                imageCache.set(src, img);
            }
        }
    }
}

function waitImage(imgEl, src) {

    return new Promise(resolve => {

        if (imgEl.src === src) return resolve();

        imgEl.onload = resolve;
        imgEl.onerror = resolve;
        imgEl.src = src;
    });
}

/* ================== FRAME UPDATE ================== */

async function updateFrameAtomic() {

    const promises = [];

    for (let i = 0; i < VID_X; i++) {

        for (let j = 0; j < VID_Y; j++) {

            const index = j * VID_X + i;

            if (!thumbs[index] || !channels[index]) continue;

            const base = `${FILE_PATH}/${frame + 1}/${j},${i}`;

            const thumbSrc = `${base}thumb.jpg`;
            const channelSrc = `${base}channel.jpg`;

            promises.push(
                waitImage(thumbs[index], thumbSrc),
                waitImage(channels[index], channelSrc)
            );
        }
    }

    await Promise.all(promises);
}

/* ================== MAIN LOOP ================== */

async function loop(now) {

    if (stopped) {

        return;
    }

    if (paused) {

        requestAnimationFrame(loop);
        return;
    }

    if (now - lastTime >= FRAME_INTERVAL) {

        for (let i = 1; i <= PRELOAD_AHEAD; i++) {

            preloadFrame(frame + i);
        }

        await updateFrameAtomic();

        frame++;
        lastTime = now;

        if (frame >= FRAME_COUNT) {

            stopVideo();
            return;
        }
    }

    requestAnimationFrame(loop);
}

console.log("To start the video, enter startVideo()\n" +
    "Other funcs: stopVideo(), pauseVideo() and resumeVideo()");
