const electron = require("electron");
const path = require("path");
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", function(event) {
  let window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", () => {
  ipcRenderer.send(
    "update-notify-value",
    document.getElementById("notifyVal").value
  );

  let window = remote.getCurrentWindow();
  window.close();
});
