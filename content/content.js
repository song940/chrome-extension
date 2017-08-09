
var port = chrome.runtime.connect({ name : "content-page" });

function injectScript(file) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  head.appendChild(script);
}

injectScript( chrome.extension.getURL('resources/js/inject.js') );

try{
  var json = JSON.parse(document.body.outerText)
  var html = JSON.stringify(json, null, 4);
  // json: open-tag
  html = html.replace(/{/g, (m) => {
    return `<span style="color: #f70;" >{</span>`;
  });
  // json: close-tag
  html = html.replace(/}/g, (m) => {
    return `<span style="color: #f70;" >}</span>`;
  });
  // json: key
  html = html.replace(/"([^"]+)":/g, (m, key) => {
    return `"<span style="color: green;">${key}</span>":`
  });
  document.body.outerHTML = `<pre>${html}</pre>`;
}catch(e){

}

// port.postMessage({ action: 'inject', code: 'document.body.style.backgroundColor="red"' });