var backgroundConnection = chrome.runtime.connect({
	name : "devtools-page"
});

chrome.cookies.getAll({}, function(cookies) {
  alert(cookies);
});
