# Play Bad Apple...on your YouTube Homepage

This is truly a certified Bad Apple moment.

## Setup
***(These instructions are written for Firefox 107.0 on Windows, but any other instructions for other browsers & operating systems are also appreciated)***

 1. Download the latest version of Node.js, if you haven't already
    (https://nodejs.org/en/download/)
 2. Clone the project, by preferred choice (If downloading a ZIP from the GitHub website, make sure to extract it)
 3. If on Windows, shift + right-click in an empty spot in File Explorer (where there aren't any files), and then select "Open PowerShell window here".
	 - If the option to do so is not shown, use Win + R and type `cmd`. Press enter or OK to run. You'll then want to navigate to the folder you cloned the project to using `cd FILEPATH`, replacing FILEPATH with where you cloned the project.
 4. Run `npm i`. This will install all required Node modules. This may take a little while, but usually under 30 seconds.
 5. Run `node .` This will run index.js, generating and splitting all 6955 frames. This may take anywhere from 20 to 2 hours, depending on your system. Once it's done though, it should tell you and exit the process. **Be patient and DO NOT CLOSE POWERSHELL. If the process is interrupted, there is NO WAY to skip the frames you've already processed.** Minimizing it is fine though.
	 - If you think it's been a hot second and should probably be done, check ./frame_output/frame_parts. If the last folder is under 6955, it is not done. If it is 6955, you can safely hit CTRL+C in PowerShell to exit.
 6. Once your frames are all generated, open the YouTube homepage. If your Shorts shelf hasn't been hidden, hit that X to close it. (It won't work as intended if it's there.) You'll then want to hit CTRL + S to save the webpage as **"Webpage, Complete." Save it in the same location you cloned the project.**

You now have the files. Here comes the fun part...

## Setting up the HTML file for it to run on localhost

*There's most definitely a better way to bypass the CORS restrictions that still exist even when downloading the YouTube homepage as a HTML file, but I don't know what that better way is. If someone out there knows, please help me.*

 1. Download the http-server package globally. (`npm install http-server -g`)
 2. Once that's done - assuming you're still in the clone directory - run `http-server`. 
	 - It's probably gonna vomit up an error saying you can't run scripts on your system. If so, run PowerShell as an admin and run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`.  This allows scripts created/stored locally (e.g. http-server) to be ran on your system, but not scripts from the internet.
 3. Go to `http://localhost:8080` in Firefox. (You can also go to `http://127.0.0.1:8080/` if that doesn't work.) Ensure it's HTTP and not HTTPS, since HTTPS will most likely result in a SSL_ERROR_RX_RECORD_TOO_LONG error. 
 4. A directory-esque webpage will appear. Click on `YouTube.html`, or whatever you saved the homepage as.

## The part where you actually Bad the Apple

 1. Now that you've cracked that bad HTML boy open, slap in that F12 menu. If you have somehow gotten this far without a keyboard, right click anywhere and hit "Inspect."
2. Skedaddle your way over to the Console tab. You can then drag-and-drop the play.js file from File Explorer into the console, or copy-and-paste its contents if you're feeling snazzy.
	 - Firefox has this neat little feature where it may ask you to type `allow pasting` in the console bar if it's your first time pasting something into it. It *shouldn't,* considering this is a local file, but if it does, type it.
3. Profit.

Depending on your specs, this may either be the smoothest or the laggiest Bad Apple you've ever seen. It plays in *real time,* so if your PC sucks enough, it may show nothing but grey.

Have fun Badding the Apple!