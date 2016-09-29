
chrome.browserAction.setBadgeBackgroundColor({
	color: [80, 80, 80, 255]
});

chrome.browserAction.setBadgeText({
	text: "3"
});

chrome.runtime.onConnect.addListener(function(port) {
	console.log('connect: ', port.name);
	/**
	 * [onMessage description]
	 * @param  {[type]} msg [description]
	 * @return {[type]}     [description]
	 */
  function onMessage(msg){
    console.log('message: ', msg, port.name);

    chrome.tabs.get(msg.tabId, function(tab){
			/**
			 * [getAll description]
			 */
      chrome.cookies.getAll({ url: tab.url }, function(cookies){
        port.postMessage({
          action: 'cookies',
          result: cookies
        });
      });

    });
		
  };

  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(function(port){
    console.log('Port %s has disconnected', port.name);
    port.onMessage.removeListener(onMessage);
  });

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

/**
 * contextMenus
 */
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

chrome.notifications.create(null, {
  type: 'basic',
  iconUrl: 'https://api.lsong.org/qr?text=icon',
  title: document.title,
  message: 'hello world'
}, function(){

});

// chrome.tabs.create({url:'https://lsong.org'});
