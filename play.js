const VID_X = 4;
const VID_Y = 3;

const VID_DIM = VID_X * VID_Y;

const FRAMERATE = 35;
const FRAME_INTERVAL = ((1 / FRAMERATE) * 1000);

const FRAME_COUNT = 6955;

let frame = 0;

const imgs = document.querySelectorAll(".yt-img-shadow");

//update_frame();

setInterval(play_video, FRAME_INTERVAL);

function update_frame()
{
    for(let i = 0; i < VID_X; ++i)
    {
        for(let j = 0; j < VID_Y; ++j)
        {
            const channel_path =  "./frame_output/frame_parts/" + (frame + 1) + "/" + j + "," + i + "channel.jpg";
            const thumbnail_path = "./frame_output/frame_parts/" + (frame + 1) + "/" + j + "," + i + "thumb.jpg";
        
            const index = (j * VID_X) + i + 0; //console.log(thumbnail_path);
            imgs[(index * 2) + 1].src = thumbnail_path; 
            imgs[(index * 2) + 2].src = channel_path;
        }
    }
}

function play_video()
{
    update_frame();
    ++frame;
    if(frame == FRAME_COUNT)
    {
        frame = 0;
    }
}