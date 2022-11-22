# Bad Apple on YouTube
Playing Bad Apple on the YouTube Homepage

Setup
-----

1. Download Project in preferred manner
2. Change the "FILE_PATH" in play.js and "project_path" in config.json to the folder in which you've downloaded the project.
3. Make sure you have FFMPEG installed. It must either be either installed in the project folder, or configured as a system variable.
4. Make sure you have NodeJS installed.
5. Run "npm i" in cmd to reinstall the packages required to run the program.

Running The Program
------------------

1. Place the input video in the "video_input" folder and change the video_input in "config.json".
2. Run "node ." in cmd to generate the frames. This'll probably take a while.
3. Download a YouTube homepage, it should have 4x3 thumbnails on the page.
4. Copy the code from "play.js" and run it in the dev console on the page
