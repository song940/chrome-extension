
console.log('content.js');

var backgroundConnection = chrome.runtime.connect({
	name : "content-page"
});
