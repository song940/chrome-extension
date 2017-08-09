var handlers = {
  cookies: (port, msg) => {
    chrome.tabs.get(msg.tabId, function(tab){
      chrome.cookies.getAll({ url: tab.url }, function(cookies) {
        port.postMessage({ action: 'cookies', cookies: cookies });
      });
    });
  },
  notify: (port, msg) => {
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
      chrome.tabs.create({ url: 'https://lsong.org/?notificationId=' + notificationId });
    });
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'https://api.lsong.org/qr?text=icon',
      title: document.title,
      message: msg.message || 'Welcome use Chrome Extension',
      buttons: [
        { title: 'open' }
      ]
    }, function(notificationId){
      console.log('notification: %s', notificationId);
    });
  },
  inject: (port, msg) => {
    chrome.tabs.executeScript({ code: msg.code });
  }
};

chrome.browserAction.setBadgeText({ text: 'Hi' });
chrome.browserAction.setBadgeBackgroundColor({
  color: [ 50, 80, 255, 255 ]
});
chrome.browserAction.onClicked.addListener(function(tab) {

});

chrome.runtime.onConnect.addListener(function(port) {
  console.log('connect: ', port.name);
  function onMessage(msg){
    console.log('message from %s: ', port.name, msg);
    handlers[ msg.action ].call(port, port, msg);
  }
  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(function(port){
    console.log('disconnected: ', port.name);
    port.onMessage.removeListener(onMessage);
  });
});

var menu = chrome.contextMenus.create({
  title    : 'My extension',
  contexts : [ 'all' ],
  onclick  : function(){
    alert('1');
  }
});

var submenu = chrome.contextMenus.create({
  type     : 'normal',
  title    : 'Translate',
  parentId : menu,
  contexts : [ 'selection' ],
  onclick  : function(ev){
    fetch(`https://api.lsong.org/translate?text=${ev.selectionText}`)
    .then(res => res.json())
    .then(res => alert(res.translation[0]))
  }
});

var filter = {
  urls: [ "<all_urls>" ],
  // types: ['xmlhttprequest']
};
// ['blocking', 'responseHeaders']
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  return { cancel: false };
}, filter, [ 'blocking' ]);

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  var headers = details.requestHeaders;
  return { requestHeaders: headers };
}, filter, [ 'blocking', 'requestHeaders' ]);

chrome.webRequest.onSendHeaders.addListener(function(details) {
  return details;
}, filter, [ 'requestHeaders' ]);

chrome.webRequest.onHeadersReceived.addListener(function(details){
  details.responseHeaders.forEach(header => {
    if(header.name.toLowerCase() === 'access-control-allow-origin'){
      console.log(header);
    }
  });
  details.responseHeaders.push({
    name : 'Access-Control-Allow-Origin', value: '*'
  });
  return { responseHeaders: details.responseHeaders };
}, filter, ['blocking', 'responseHeaders']);
