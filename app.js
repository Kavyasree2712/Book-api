//wip
// using google books api
console.log("connected")
const container = document.getElementById("books");
container.style.display = "none";

document.getElementById("search")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        loadBooks();
    }
});

// load books on click
function loadBooks() {
let truncate = (element, limit, after) => {
  if(!element || !limit) return;
  
  let content = element.innerHTML.trim();
  
  content = content.split(' ').slice(0, limit);
  content = content.join(' ') + (after ? after : '');
  element.innerHTML = content;
};

const search = document.getElementById("search");
let query = search.value;
const apiKey = "AIzaSyCnqAY4B3OfL7C3xgvBaXeYsMHThNZkJBY";
let url = "https://www.googleapis.com/books/v1/volumes?q="+ query + "&key=" + apiKey;
setTimeout(function(){ container.style.display = "block"; }, 600);
// get the url
axios.get(url)
  .then(res => { 
    let data = res.data;
    console.log(res);
    // container.innerHTML = "";
    Array.from(container.children).forEach((item) => {
      item.parentElement.removeChild(item)
    });
    
    for(let i = 0; i <= 9; i++) {
      let items = data.items[i];
      let volume = items.volumeInfo;
      let title = volume.title;
      let desc = volume.description;
      let publish = volume.publishedDate;
      let img = volume.imageLinks;
      let imgurl = img.thumbnail;
      
      // document.getElementById("title").innerHTML = title;
      // document.getElementById("published").innerHTML = "Published on " + publish;
      // document.getElementById("desc").innerHTML = desc;
      // document.getElementById("img_url").src = imgurl;
      
      const books = document.createElement("div");
            books.className = "book-release";
            books.innerHTML = `<div class="inner_book-release">
                                  <img src="${imgurl}">
                                  <div class="description">
                                  <h1>${title}</h1>
                                  <p class="pb"><span class="published">Published on ${publish}</span></p>
                                  ${desc}</div>
                               </div>`;
      
      container.appendChild(books);
      truncate(books, 220, '...');
    }
  
}).catch(error => {
    console.log('error', error);
});
}
