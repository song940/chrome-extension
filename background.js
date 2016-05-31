
chrome.webRequest.onBeforeSendHeaders.addListener(function(request){
  console.log(request);
}, {
  urls: [ "<all_urls>" ]
}, [ "blocking", "requestHeaders" ]);
