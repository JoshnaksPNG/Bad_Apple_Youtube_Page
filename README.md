# Bad Apple on YouTube (Fork)
Playing Bad Apple on the YouTube Homepage

Setup
-----

1. Download Project in preferred manner
2. Make sure you have **FFMPEG** installed. It must either be either installed in the project folder, or configured as a system variable.
3. Make sure you have **NodeJS** installed.
4. Run `npm i` in cmd to reinstall the packages required to run the program.

Running The Program
-------------------

1. Place the input video in the **video_input** folder and change the **input_video** in **config.json**.
2. Run `node .` or `npm start` in cmd to generate the frames. This'll probably take a while.
3. Run **youtube_clone/clone.html** in any browser.
4. Open **DevTools** on the page (**f12** or **Ctrl+Shift+I**) and enter `startVideo()` in console.
5. To pause, use `pauseVideo()`, to resume - `resumeVideo()`, and to completely stop the video and reset the frame, use `stopVideo()`.

> [!WARNING]
> For correct display, it is necessary that the page layout has **4 videos in 1 row**. On my screen, the page is displayed this way when **DevTools** is not open. When opening **DevTools** on the right, the markup changes to **3 videos in 1 row**. Changing the page size by **80%** (**Ctrl+double minus**) helps me.

License
-------
This project is licensed under the [MIT License](LICENSE).  

The included fonts (Roboto, Material Icons) are licensed under their respective licenses:  
- Roboto: [OFL 1.1](youtube_clone/styles/Roboto/LICENSE)
- Material Icons: [Apache License 2.0](youtube_clone/styles/Material/LICENSE)

Trademark notice
----------
The YouTube logo is a trademark of Google LLC. It is used here for educational / demonstrational purposes only. Google LLC is not affiliated with or endorses this project.
