# Play Bad Apple...on your YouTube Homepage

This is truly a certified Bad Apple moment.

## Setup
***(These instructions were written on a Windows machine running Firefox 107.0. Regardless, these instructions should work across any modern OS and browser.)***

<h2 id="one">
1 - Preparing the files
</h2>

- [For Windows](#windows)
- [For Mac, and other Unix-like systems (e.g. Ubuntu)](#unix-based-systems)

### Windows
 1. [Download the latest version of Node.js](https://nodejs.org/en/download/), if you haven't already
 2. Clone the project, by preferred choice (If downloading a ZIP from the GitHub website, make sure to extract it)
 3. Shift + right-click in an empty spot in File Explorer (where there aren't any files), and then select "Open PowerShell window here".
	 - If the option to do so is not shown, use Win + R and type `cmd`. Press enter or OK to run. You'll then want to navigate to the folder you cloned the project to using `cd FILEPATH`, replacing FILEPATH with where you cloned the project.
 4. Run `npm i`. This will install all required Node modules. This may take a little while, but usually under 30 seconds.
 5. Run `node .` This will run index.js, generating and splitting all 6955 frames. This may take anywhere from 20 to 2 hours, depending on your system. Once it's done though, it should tell you and exit the process. **Be patient and DO NOT CLOSE POWERSHELL. If the process is interrupted, there is NO WAY to skip the frames you've already processed.** Minimizing it is fine though.
	 - If you think it's been a hot second and should probably be done, check ./frame_output/frame_parts. If the last folder is under 6955, it is not done. If it is 6955, you can safely hit CTRL + C in PowerShell to exit.
 6. Once your frames are all generated, open the YouTube homepage. If your Shorts shelf hasn't been hidden, hit that X to close it. (It won't work as intended if it's there.) You'll then want to hit CTRL + S to save the webpage as **"Webpage, Complete." Save it in the same location you cloned the project.**
	  - If CTRL + S doesn't work in your browser for some reason, try finding a File menu to use File > Save as. Right clicking in an empty space on a webpage may also bring up an option to save it.
7. [Proceed to Section 2.](#two)
 
### Unix-based systems
 1. [Download the latest version of Node.js](https://nodejs.org/en/download/), if you haven't already
 2. Clone the project, by preferred choice (If downloading a ZIP from the GitHub website, make sure to extract it)
 3. Open a terminal window, navigating to the folder you just extracted this repository to.
	 - For Mac, navigate to the folder in Finder. If you can't see the path bar at the bottom of it, go to View > Show Path Bar. CTRL + Left-click the folder in the path bar, and then choose "Open in Terminal."
	 - For Ubuntu, and similarly for all other distros, right click in an empty file explorer space and click "Open in Terminal." If you can't find this, use CTRL + Alt + T. Use `cd` to direct yourself to the folder.
 4. Run `npm i`. This will install all required Node modules. This may take a little while, but usually under 30 seconds.
 5. Run `node .` This will run index.js, generating and splitting all 6955 frames. This may take anywhere from 20 to 2 hours, depending on your system. Once it's done though, it should tell you and exit the process. **Be patient and DO NOT CLOSE TERMINAL. If the process is interrupted, there is NO WAY to skip the frames you've already processed.** Minimizing it is fine though.
	 - If you think it's been a hot second and should probably be done, check ./frame_output/frame_parts. If the last folder is under 6955, it is not done. If it is 6955, you can safely just exit Terminal.
 6. Once your frames are all generated, open the YouTube homepage. If your Shorts shelf hasn't been hidden, hit that X to close it. (It won't work as intended if it's there.) You'll then want to hit CTRL + S to save the webpage as **"Webpage, Complete." Save it in the same location you cloned the project.**
	 - If CTRL + S doesn't work in your browser for some reason, try finding a File menu to use File > Save as. Right clicking in an empty space on a webpage may also bring up an option to save it.
7. [Proceed to Section 2.](#two)

You now have the files. Here comes the fun part...

<h2 id="two">
2 - Installing an extension (or changing settings) to prevent the browser from throwing errors
</h2>

There's this thing out there called [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) that prevents local scripts from running on externally hosted webpages. Even though you have a local copy of your YouTube homepage, your browser probably won't like it. An extension (like the one listed below) can solve this issue.

You can skip this step if you:
- Can't find an extension for your browser anywhere online
- Know for a fact that CORS is not an issue in your browser

#### Browsers:
- [For Firefox](#firefox)
- [For Chrome](#chrome)
- [For Safari](#safari)

### Firefox
[Install the CORS Everywhere extension](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/). Congratulations, you're done.

### Chrome
Most extensions have reviews stating that they don't work on all operating systems. To disable CORS on Chrome for your operating system, refer to [this gist.](https://gist.github.com/tsur/1ae0800400cf1b2bd63c)

### Safari
If you want to disable the same-origin policy on Safari, just enable (and open) the developer menu and select "Disable Cross-Origin Restrictions." That's it. If you don't see the Develop menu in the menu bar, open Settings, click Advanced, and select "Show Develop menu in menu bar."

If none of these options work, consider [Section 2.5.](#twopo)

<h2 id="twopo">
2.5 - Setting up the HTML file for it to run on localhost, if Section 2 doesn't work
</h2>

*If you're unable to use the extension to bypass CORS restrictions, consider using http-server to host the file locally as a server. Hosting it as a server makes most browsers not vomit, because everything is local and everything is happy.*

*It's also worth noting that this method may or may not cause performance errors.*

 1. Download the [http-server](https://www.npmjs.com/package/http-server) package globally. (`npm install http-server -g`)
 2. Once that's done - assuming you're still in the clone directory - run `http-server`. 
	 - If you're on Windows, it's probably gonna vomit up an error saying you can't run scripts on your system. If so, run PowerShell as an admin and run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`.  This allows scripts created/stored locally (e.g. http-server) to be ran on your system, but not scripts from the internet.
 3. Go to `http://localhost:8080` in your browser. (You can also go to `http://127.0.0.1:8080/` if that doesn't work.) Ensure it's HTTP and not HTTPS, since HTTPS will most likely result in a SSL_ERROR_RX_RECORD_TOO_LONG error. 
 4. A directory-esque webpage will appear. Click on `YouTube.html`, or whatever you saved the homepage as.

## 3 - The part where you actually Bad the Apple

 1. Now that you've cracked that bad HTML boy open, slap open that Inspect menu. This is usually F12, but you can also try CTRL + SHIFT + I or CMD + OPTION + I.
2. Skedaddle your way over to the Console tab. You can then drag-and-drop the play.js file from your file explorer of choice into the console, or copy-and-paste its contents if you're feeling snazzy.
	 - Firefox has this neat little feature where it may ask you to type `allow pasting` in the console bar if it's your first time pasting something into it. It *shouldn't,* considering this is a local file, but if it does, type it.
3. Profit.

Depending on your specs, this may either be the smoothest or the laggiest Bad Apple you've ever seen. It plays in *real time,* so if your PC sucks enough, it may show nothing but grey.

Have fun Badding the Apple!
