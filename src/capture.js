const electron = require("electron");
const fs = require("fs");
const path = require("path");
const { desktopCapturer, ipcRenderer: ipc, screen } = electron;


const findMainSource = (desktopCapturer, screen, done) => {
	const options = {
		types: ["screen"],
		thumbnailSize: screen.getPrimaryDisplay().workAreaSize
	};
	desktopCapturer.getSources(options, (err, sources) => {
		if (err) return console.log("could not find source to capture!");
		
		const isMainSource = source => source.name === "Entire screen" || source.name === "Screen 1";
		done(sources.filter(isMainSource)[0]);
	});
    
};

const onCapture = (evt, targetPath) => {
	findMainSource(desktopCapturer, screen, source => {
		const png = source.thumbnail.toPng();
		const filePath = path.join(targetPath, new Date() + ".png");
		writeScreenshot(png, filePath);
	});
    
};

const writeScreenshot = (png, filePath) => {
	fs.writeFile(filePath, png, err => {
		if (err) return console.log("failed to write screenshot source:", err);
        
	});
};

ipc.on("capture", onCapture);