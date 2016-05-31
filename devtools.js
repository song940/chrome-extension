

chrome.devtools.panels.create("X-Man", "icon.png", "./devtools/index.html",function(panel) {
    // code invoked on panel creation
});

chrome.devtools.panels.elements.createSidebarPane("My Sidebar", function(sidebar) {
  // sidebar initialization code here
  sidebar.setObject({ some_data: "Some data to show" });
});
