import { app, BrowserWindow, screen } from 'electron';
import * as url from 'url';
import * as path from 'path';

class MainWindow {
    private window: BrowserWindow;

    constructor (private args: string[]) { }

    private createWindow() {
        this.window = new BrowserWindow({
            width: screen.getPrimaryDisplay().size.width * 0.75,
            height: screen.getPrimaryDisplay().size.height * 0.75,
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        if (this.args.some(val => val === '--serve')) {
            this.window.loadURL('http://localhost:4200');
        } else {
            this.window.loadURL(
                url.format({
                    pathname: path.join(__dirname, `/angularApp/index.html`),
                    protocol: 'file:',
                    slashes: true
                })
            );
        }
        this.window.on('closed', function () {
            this.window = null;
        });
    }

    registerWindow() {
        app.on('ready', this.createWindow.bind(this));
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
        app.on('activate', () => {
            if (this.window === null) {
            }
        });
    }
}

const electronApp = new MainWindow(process.argv.slice(1));
electronApp.registerWindow();