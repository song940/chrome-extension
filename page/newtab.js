chrome.topSites.get(function(topSites){
  console.log('newtab', topSites);
});

fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US', {})
.then(res => res.json())
.then(res => {
  const [ image ] = res.images;
  const { url, copyright, copyrightlink } = image;
  document.getElementById('copyright').href = copyrightlink;
  document.getElementById('copyright').innerText = copyright;
  document.getElementById('bg').style.backgroundImage = `url(https://bing.com${url})`;
});