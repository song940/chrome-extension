
chrome.runtime.onConnect.addListener(function(port) {
  console.log('connect: ', port.name);
  
  function onMessage(msg){
    console.log('message from %s: ', port.name, msg);
    
    switch (msg.action) {
      case 'request-cookies':
        chrome.tabs.get(msg.tabId, function(tab){
          chrome.cookies.getAll({ url: tab.url }, function(cookies) {
            port.postMessage({ action: 'cookies', cookies: cookies });
          });
        });
        break;
      default:
        
    }
  }

  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(function(port){
    console.log('disconnected: ', port.name);
    port.onMessage.removeListener(onMessage);
  });

});

badge();
function badge(){
  Ajax()
  .get('https://api.lsong.org/beijingair')
  .end(function(err, res){
    var AQI = parseInt(res[0].AQI, 10);
    
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'https://api.lsong.org/qr?text=icon',
      title: document.title,
      message: 'current AQI ' + AQI,
      buttons: [
        { title: 'open' }
      ]
    }, function(notificationId){
      console.log('notification: %s', notificationId);
    });
    
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
      chrome.tabs.create({ url: 'https://api.lsong.org/beijingair' });
    });
    
    chrome.browserAction.setBadgeText({ text: String(AQI) });
    chrome.browserAction.setBadgeBackgroundColor({
      color: [ 
        Math.min(255, 50 + AQI),
        Math.max(0 , 255 - AQI),
        80, 255
      ]
    });
  });
  
  setTimeout(badge, 36e5);
}

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
  onclick  : function(){
    alert('2');
  }
});



/**
 * webRequest
 */
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
