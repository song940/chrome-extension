

chrome.devtools.panels.create("Cookie", "icon.png", "./devtools/panel.html", function(panel) {
  // code invoked on panel creation
});

chrome.devtools.panels.elements.createSidebarPane("My Sidebar", function(sidebar) {
  // sidebar initialization code here
  sidebar.setPage("./devtools/sidebar.html");
  // sidebar.setObject({ some_data: "Some data to show" });
});

var backgroundConnection = chrome.runtime.connect({
	name : "devtools-page"
});
