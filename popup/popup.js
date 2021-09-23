
const port = chrome.runtime.connect({ name: "popup-page" });

chrome.tabs.query({
  active: true,
  windowId: chrome.windows.WINDOW_ID_CURRENT
}, tabs => {
  const [currentTab] = tabs;
  const qrcode = document.getElementById('qrcode');
  qrcode.src = 'https://api.lsong.me/qr?text=' + encodeURIComponent(currentTab.url);
});