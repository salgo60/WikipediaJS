let searchUrlbase = '.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrlbase = '.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let language = "en";
let searchUrl = 'https://' + language + searchUrlbase;
let contentUrl = 'https://' + language + contentUrlbase;

let userInput;
let wikiInput;
let counter = 0;

function setup() {
  noCanvas();
  userInput = select('#userinput');
  userInput.changed(startSearch);
  goWiki(startSearch())
  }

function startSearch(){
    counter = 0;
    goWiki(userInput.value())
    }
function goWiki(term) {
    counter = counter + 1;
    if (counter < 11) {
        let url = getSearchUrl(term)
        console.log(url)
        loadJSON(url,gotSearch,'jsonp');}
    else {
        createDiv("End do a new search")
        return;
    }
  }
function  gotSearch(data,language){
  console.log(data);
  let len = data.length;
  let index = floor(random(len))
  var title = data[1][index];
  console.log(title)
  if (title === undefined) { // Looks we have a problem with Swedish Wikipedia and undefined
    createDiv("Undefined Title")
    return;
    }
  console.log(len)
  console.log(index)
  console.log(data)
  title = title.replace(/\s+/g,'_')
  createDiv()
  createA('http://sv.wikipedia.org/wiki/'+title,title);
  console.log(title);
  let url = getContentUrl(title);
  loadJSON(url,gotContent,'jsonp');
  }
function getSearchUrl(term){
    return searchUrl + term;
}
function getContentUrl(term){
    return contentUrl + term;
 }
function gotContent(data){
     let page = data.query.pages;
     let pageId = Object.keys(data.query.pages)[0];
     console.log(pageId);
     let content = page[pageId].revisions[0]['*']
     //console.log(content)
     let wordRegexp = /\b\w{4,}/g;
     var words = content.match(wordRegexp);
     var word = random(words)
     console.log(word)
     goWiki(word)
  }