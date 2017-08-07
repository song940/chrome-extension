var handlers = {
	'request-cookies': () => {
		chrome.tabs.get(msg.tabId, function(tab){
      chrome.cookies.getAll({ url: tab.url }, function(cookies) {
        port.postMessage({ action: 'cookies', cookies: cookies });
      });
    });
	}
};


chrome.runtime.onConnect.addListener(function(port) {
  console.log('connect: ', port.name);
  function onMessage(msg){
    console.log('message from %s: ', port.name, msg);
    handlers[ msg.action ].call(port, msg);
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
  title    : 'Test',
  parentId : menu,
  contexts : [ 'selection' ],
  onclick  : function(ev){
    fetch(`https://api.lsong.org/translate?text=${ev.selectionText}`)
    .then(res => res.json())
    .then(res => console.log(res))
  }
});

var filter = { urls: [ "<all_urls>" ] };
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  return { cancel: false };
}, filter, [ 'blocking' ]);

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  var headers = details.requestHeaders;
  headers.push({ name: 'Date', value: '' + new Date });
  return {requestHeaders: headers };
}, filter, [ 'blocking', 'requestHeaders' ]);

chrome.webRequest.onSendHeaders.addListener(function(details) {
}, filter, [ 'requestHeaders' ]);

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
  chrome.tabs.create({ url: 'https://lsong.org/?notificationId=' + notificationId });
});

chrome.notifications.create(null, {
  type: 'basic',
  iconUrl: 'https://api.lsong.org/qr?text=icon',
  title: document.title,
  message: 'Welcome use Chrome Extension',
  buttons: [
    { title: 'open' }
  ]
}, function(notificationId){
  console.log('notification: %s', notificationId);
});

chrome.browserAction.setBadgeText({ text: 'Hi' });
chrome.browserAction.setBadgeBackgroundColor({
  color: [
    Math.min(255, 50),
    Math.max(0 , 255),
    80, 255
  ]
});