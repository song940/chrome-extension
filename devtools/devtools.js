
var port = chrome.runtime.connect({ name : 'devtools-page' });

chrome.devtools.panels.create("Cookie", "icon.png", "./devtools/panel.html", function(panel) {});
chrome.devtools.panels.elements.createSidebarPane("My Sidebar", function(sidebar) {
  sidebar.setPage("./devtools/sidebar.html");
  sidebar.setObject({ some_data: "Some data to show" });
});
