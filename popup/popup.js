
var port = chrome.runtime.connect({
	name : "popup-page"
});

chrome.tabs.query({
	active: true,
	windowId: chrome.windows.WINDOW_ID_CURRENT
}, function(tabs){
	var current_tab = tabs[0];
	var qrcode = document.getElementById('qrcode');
	qrcode.src = 'https://api.lsong.org/qr?text=' + encodeURIComponent(current_tab.url);
});