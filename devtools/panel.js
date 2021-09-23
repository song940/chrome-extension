
const port = chrome.runtime.connect({ name: "devtools-panel" });

port.onMessage.addListener(msg => {
  console.log('onMessage:', msg);
});

const { tabId } = chrome.devtools.inspectedWindow;
port.postMessage({ action: 'cookies', tabId });
