const {
    app,
    BrowserWindow,
    Menu,
    shell
} = require("electron");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("src/index.html");

    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });

    var menu = Menu.buildFromTemplate([{
            label: "Menu",
            submenu: [{
                    label: "Adjust Notification Value"
                },
                {
                    label: "CoinMarketCap",
                    click() {
                        shell.openExternal('http://coinmarketcap.com')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: "Exist",
                    click() {
                        app.quit()
                    }
                },

            ]
        },
        {
            label: "Info"
        }
    ])

    Menu.setApplicationMenu(menu);
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