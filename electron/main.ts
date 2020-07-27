import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000/index.html");
    // win.webContents.openDevTools();
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  // DevTools
  // https://github.com/electron/electron/issues/23662
  // Bug with React and Redux DevTools on Electron 9
  // comment installExtension for now
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
