const electron = require("electron");

const { 
	app,  
	BrowserWindow,
	globalShortcut
} = electron;

app.on("ready", () => {
	let mainWindow = new BrowserWindow({
		width: 900,
		height: 500,
		resizeable: false,
		frame: false
	});
    
	mainWindow.openDevTools();
    
	mainWindow.loadURL(`file://${__dirname}/capture.html`);
	mainWindow.on("close", () => {
		mainWindow = null;
		app.quit();
	});
    
	globalShortcut.register("Ctrl+Alt+Cmd+D", () => {
		mainWindow.webContents.send("capture", app.getPath("pictures"));
	});
});