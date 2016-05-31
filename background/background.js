
chrome.webRequest.onBeforeSendHeaders.addListener(function(request){
  console.log(request);
}, {
  urls: [ "<all_urls>" ]
}, [ "blocking", "requestHeaders" ]);


var menu = chrome.contextMenus.create({
  title    : 'My extension',
  contexts : [ 'all' ],
  onclick  : function(){
    alert('1');
  }
});



var menu = chrome.contextMenus.create({
  type     : 'normal',
  title    : 'Test',
  parentId : menu,
  contexts : [ 'selection' ],
  onclick  : function(){
    alert('2');
  }
});