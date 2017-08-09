var port = chrome.runtime.connect({ name : "options-page" });

var menu = document.getElementById('menu');
var cors = document.getElementById('cors');
var tabs = [].slice.call(document.querySelectorAll('.tab'));

function switchTab(name){
  var tab = document.querySelector(name);
  tabs.forEach(tab => tab.style.display = 'none');
  if(tab) tab.style.display = 'block';
}

menu.addEventListener('click', e => {
  switchTab(e.target.getAttribute('href'));
});

cors.addEventListener('submit', (e) => {
  e.preventDefault();
  var form = e.target;
  var formData = [].slice
  .call(form.querySelectorAll('input'))
  .reduce((formData, el) => {
    formData[ el.name ] =
      el.value || el.getAttribute('default');
    return formData;
  }, {});
  chrome.storage.sync.set({ cors: formData }, function() {
    port.postMessage({ action: 'notify', message: 'Settings saved' });
  });
});

switchTab('#cors');