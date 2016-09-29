var name = 'devtools-page';

var tabId = chrome.devtools.inspectedWindow.tabId;

var port = chrome.runtime.connect({ name : name });

port.onMessage.addListener(function(msg){
  alert(msg.action);
  switch(msg.action){
    case '':
    break;
  }
});

chrome.devtools.panels.create("Cookie", "icon.png", "./devtools/panel.html", function(panel) {
  
  panel.onShown.addListener(function(){
    // TODO:
  });

});

chrome.devtools.panels.elements.createSidebarPane("My Sidebar", function(sidebar) {
  sidebar.setPage("./devtools/sidebar.html");
  sidebar.setObject({ some_data: "Some data to show" });
});
