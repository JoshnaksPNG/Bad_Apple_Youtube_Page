const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const sharp = require("sharp");
const os = require("os");

const CONFIG = JSON.parse(fs.readFileSync("config.json"));
const VIDEO_IN = CONFIG.input_video;

const EVERY_N_FRAME_SET = 1;
const VID_X = 4;
const VID_Y = 3;

const THUMBNAIL_WIDTH = 281;
const THUMBNAIL_HEIGHT = 158;

const CHANNEL_WIDTH = 36;
const CHANNEL_HEIGHT = 36;

const HORIZONTAL_MARGIN = 16;
const VERTICAL_MARGIN = 86;
const VERTICAL_MINOR = 12;

// Main directories
const WHOLE_FRAMES_DIR = "frame_output/whole_frames";
const FRAME_PARTS_DIR = "frame_output/frame_parts";

// Create directories if they don't exist
[WHOLE_FRAMES_DIR, FRAME_PARTS_DIR].forEach(dir => {

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Resize params
const PIXEL_WIDTH = (HORIZONTAL_MARGIN * (VID_X - 1)) + (THUMBNAIL_WIDTH * VID_X);
const PIXEL_HEIGHT = (VERTICAL_MARGIN * (VID_Y - 1)) + ((THUMBNAIL_HEIGHT + VERTICAL_MARGIN) * VID_Y);

/** Get whole scaled frames from a video */
function extractFrames() {

    return new Promise((resolve, reject) => {

        const cmd = `ffmpeg -i "${path.join("video_input", VIDEO_IN)}" \
-q:v 2 \
-vf "select=not(mod(n\\,${EVERY_N_FRAME_SET})),scale=${PIXEL_WIDTH}:${PIXEL_HEIGHT}" \
"${path.join(WHOLE_FRAMES_DIR, "input_%d.jpg")}"`;

        exec(cmd, (err) => {

            if (err) reject(err);
            else resolve();
        });
    });
}

/** Crop the frame into 24 parts */
async function processFrame(frameFile) {

    const match = path.basename(frameFile).match(/input_(\d+)\.jpg/);
    const frameIndex = match[1];

    const framePartDir = path.join(FRAME_PARTS_DIR, frameIndex);

    if (!fs.existsSync(framePartDir)) fs.mkdirSync(framePartDir, { recursive: true });

    const image = sharp(frameFile);

    for (let j = 0; j < VID_X; j++) {

        for (let k = 0; k < VID_Y; k++) {

            // Thumbnail
            const thumbX = j * (THUMBNAIL_WIDTH + HORIZONTAL_MARGIN);
            const thumbY = k * (THUMBNAIL_HEIGHT + VERTICAL_MARGIN);
            const thumbPath = path.join(framePartDir, `${k},${j}thumb.jpg`);

            await image.clone()
                .extract({ left: thumbX, top: thumbY, width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT })
                .toFile(thumbPath);

            // Channel
            const channelX = j * (THUMBNAIL_WIDTH + HORIZONTAL_MARGIN);
            const channelY = (THUMBNAIL_HEIGHT + VERTICAL_MINOR) +
                ((THUMBNAIL_HEIGHT + VERTICAL_MARGIN) * k);
            const channelPath = path.join(framePartDir, `${k},${j}channel.jpg`);

            await image.clone()
                .extract({ left: channelX, top: channelY, width: CHANNEL_WIDTH, height: CHANNEL_HEIGHT })
                .toFile(channelPath);
        }
    }
}

/** Parallel processing of all frames */
async function processAllFrames() {

    const files = fs.readdirSync(WHOLE_FRAMES_DIR).filter(f => f.endsWith(".jpg"));
    const concurrency = os.cpus().length;
    let index = 0;

    async function worker() {

        while (index < files.length) {

            const file = path.join(WHOLE_FRAMES_DIR, files[index++]);
            await processFrame(file);
        }
    }

    const workers = [];

    for (let i = 0; i < concurrency; i++) workers.push(worker());
    await Promise.all(workers);
}

// Main start
(async () => {

    try {

        console.log("Extracting frames (resized)...");
        await extractFrames();
        console.log("Frames extracted. Processing tiles...");
        await processAllFrames();
        console.log("All frames processed successfully!");
    }
    catch (err) {

        console.error("Error:", err);
    }
})();
