
document.cookie = "safeCookie1=foo; SameSite=Lax"; 
document.cookie = "safeCookie2=foo";  
document.cookie = "crossCookie=bar; SameSite=None; Secure";
let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach(menus => menus.addEventListener("click", ()=>getNewsByTopic(event) ));
let searchButton = document.getElementById("search-button");
let url;
let page = 1;
let total_pages = 0;

const getNews = async () => {
  try{
    let header = new Headers({'x-api-key' : 'W4WpiwMC1BBhx5mNm6lw6SDm5HieUdgGiK_ay4OX9xI',
  });
  
    url.searchParams.set("page", page);
    console.log(url); 
    let response = await fetch(url, {headers: header});
    let data = await response.json();
    if(response.status == 200){
      if(data.total_hits == 0){
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagination();
    }else{
      throw new Error(data.message);
    }  
  }catch(error){
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
  getNews();
}




const getNewsByTopic = async (event) => {
  console.log(event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`);
  getNews();

}

const getNewsByKeyword = async  () => {
  console.log("click");
  let keyword = document.getElementById("search-input").value;
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();

}


const render = () => {
  let newsHTML = '';
  newsHTML = news.map((item) =>{
  return `<div class="row news">
    <div class="col-lg-4">
      <img src="${item.media}" alt="" class= "news-img-size">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>
        ${item.rights} * ${item.published_date}
      </div>
    </div>
  </div>`
  }).join('');
  document.getElementById("news-board").innerHTML = newsHTML
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`
  document.getElementById("news-board").innerHTML = errorHTML;
}

const pagination = () => {
  let paginationHTML =``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  let first = last - 4;

  paginationHTML = `<li class="page-item"><a class="page-link" href="#" onclick= "moveToPage(${page - 1})">Previous</a></li>`
  for(let i = first; i <= last; i++){
    paginationHTML+= `<li class="page-item ${page == i?"active":""}"><a class="page-link" onclick= "moveToPage(${i})" href="#">${i}</a></li>`;
  }
  paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick= "moveToPage(${page + 1})">Next</a></li>`
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum
  console.log(page);
}

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();