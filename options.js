;(function(){
  
  var tabs = document.querySelector('.tabs');
  tabs.addEventListener('click', function(ev){
    var el = ev.target;
    if(el.nodeName != 'A') return;
    ev.preventDefault();
    
    [].slice.call(document.querySelectorAll('.tab')).forEach(function(tab){
      tab.style.display = 'none';
    });
    
    [].slice.call(document.querySelectorAll('.tabs li')).forEach(function(li){
      li.className = '';
    });
    
    var tab = el.href.split('#')[1];
    el = el.parentNode;
    tab = document.getElementById(tab);
    
    el.className = 'active';
    tab.style.display = 'block';
    
  });
  
})();
