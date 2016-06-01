var tabId = chrome.devtools.inspectedWindow.tabId;

var port = chrome.runtime.connect({
	name : "devtools-page"
});

port.onMessage.addListener(function(msg){
  switch(msg.action){
    case 'cookies':
    renderTable(msg.result);
    break;
  }
});

port.postMessage({ action: 'request-cookies', tabId: tabId });

var keys = [ 'Name', 'Value', 'Domain', 'Path', 'Expires/Max-Age', 'Size', 'HTTP', 'Secure', 'Samsite' ];

function renderTable(cookies){
  var table = document.createElement('table');  
  cookies.map(function(cookie){
    var tr = document.createElement('tr');
    Object.keys(cookie).map(function(key){
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(cookie[key]));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  document.body.appendChild(table);
}