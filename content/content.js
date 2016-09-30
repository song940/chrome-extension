
var port = chrome.runtime.connect({
	name : "content-page"
});

function injectScript(file) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    head.appendChild(script);
}

if(!!~navigator.userAgent.indexOf('MicroMessenger')){
	injectScript( chrome.extension.getURL('resources/js/wxjsbridge.js') );
}
