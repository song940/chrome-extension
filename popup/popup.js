
var port = chrome.runtime.connect({
	name : "popup-page"
});

console.log('popup');

var qrcode = document.getElementById('qrcode')

chrome.tabs.query({
	active: true,
	windowId: chrome.windows.WINDOW_ID_CURRENT
}, function(tabs){
	var current_tab = tabs[0];
	qrcode.src = 'https://api.lsong.org/qr?text=' + encodeURIComponent(current_tab.url);
});