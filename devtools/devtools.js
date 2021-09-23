
const port = chrome.runtime.connect({ name: 'devtools-page' });

chrome.devtools.panels.elements.createSidebarPane("My Sidebar", sidebar => {
  sidebar.setPage("./devtools/sidebar.html");
  sidebar.setObject({ some_data: "Some data to show" });
});

chrome.devtools.panels.create("My Panel", "icon.png", "./devtools/panel.html", panel => {
  console.log('Devtools Panel', panel);
});