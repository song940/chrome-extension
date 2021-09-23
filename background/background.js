
const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab;
};

const getTabById = tabId =>
  new Promise(resolve => chrome.tabs.get(tabId, resolve));

const getCookies = url =>
  new Promise(done => chrome.cookies.getAll({ url }, done));

const browserAction = ({ text, bgColor: color, onClick }) => {
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
  if (typeof onClick === 'function') {
    chrome.browserAction.onClicked.addListener(onClick);
  }
};

const createNotification = ({ title, message }) => {
  chrome.notifications.create(null, {
    type: 'basic',
    title,
    message,
    buttons: [
      { title: 'open' }
    ]
  }, function (notificationId) {
    console.log('notification: %s', notificationId);
  });
  chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    chrome.tabs.create({ url: 'https://lsong.org/?notificationId=' + notificationId });
  });
};


const menu = chrome.contextMenus.create({
  title: 'My extension',
  contexts: ['all'],
});

const submenu = chrome.contextMenus.create({
  type: 'normal',
  title: 'Translate',
  parentId: menu,
  contexts: ['selection'],
  onclick: async (e) => {
    const response = await fetch(`https://api.lsong.me/fanyi?q=${e.selectionText}`)
    const body = await response.json();
    console.log(body.translation[0]);
  }
});

browserAction({ text: 'haha', bgColor: [50, 80, 255, 255] });