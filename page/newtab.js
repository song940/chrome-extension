
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

chrome.topSites.get(function(topSites){
  console.log('newtab', topSites);  
  topSites.forEach(function(site){
    var li = document.createElement('li');
    li.style.backgroundColor = getRandomColor();
    
    var icon = document.createElement('img');
    icon.src = site.url + '/favicon.ico';
    icon.onload = function(){
      li.appendChild(icon);
    };
    
    var link = document.createElement('a');
    link.href = site.url;
    link.appendChild(document.createTextNode(site.title));
    li.appendChild(link);
    
    document.body.appendChild(li);
  });
});

