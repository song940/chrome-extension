
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
    var site = document.getElementById('site');
    var li = document.createElement('li');
    
    var icon = document.createElement('img');
    icon.src = site.url + '/favicon.ico';
    icon.onload = function(){
      li.appendChild(icon);
    };
    
    var link = document.createElement('a');
    link.href = site.url;
    link.appendChild(document.createTextNode(site.title));
    li.appendChild(link);
    
    // site.appendChild(li);
  });
});


var runner = new Runner('#game');
