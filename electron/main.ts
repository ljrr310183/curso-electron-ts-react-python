import { app, BrowserWindow } from "electron";
import path from "path";

const isDarwin: boolean = process.platform === "darwin";

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173/';

function createWindow() {
    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload/preload.cjs")
        }
    });

    if(VITE_DEV_SERVER_URL){
         console.log("Dev URL:", VITE_DEV_SERVER_URL);  // ← añade esto
        win.loadURL(VITE_DEV_SERVER_URL);
        win.webContents.openDevTools();
    }else{
        win.loadFile(path.join(__dirname, "../../dist/index.html"));
    }    
}

app.whenReady().then(createWindow);

app.on("window-all-closed",() =>{
    if(!isDarwin) app.quit(); // En macOS es común que las aplicaciones permanezcan abiertas incluso sin ventanas
})