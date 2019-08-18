const electron = require("electron");
const axios = require("axios");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const notifier = require("node-notifier");
const ipcRenderer = electron.ipcRenderer;

const notifyBtn = document.getElementById("notifyBtn");
const price = document.querySelector("h1");
const targetPrice = document.getElementById("targetPrice");
let targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!"
};

const getBTC = async () => {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
  );
  const {
    data: {
      BTC: { USD }
    }
  } = response;
  price.innerHTML = `$${USD.toLocaleString("en")}`;

  if (targetPrice.innerHTML !== "" && USD > targetPriceVal) {
    notifier.notify({
      title: "BTC",
      message: String(USD),
      icon: path.join(__dirname, "../assets/images/btc.png")
    });
  }
};

getBTC();
setInterval(getBTC, 3000);

notifyBtn.addEventListener("click", function(event) {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.on("close", function() {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

ipcRenderer.on("targetPriceVal", (event, args) => {
  targetPriceVal = Number(args);
  targetPrice.innerHTML = `$${targetPriceVal.toLocaleString("en")}`;
});
