
const port = chrome.runtime.connect({ name: "content-page" });

function injectScript(file) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  head.appendChild(script);
}

injectScript(chrome.extension.getURL('resources/js/inject.js'));