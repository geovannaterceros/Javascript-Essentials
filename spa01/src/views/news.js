export async function renderNews(container) {
  container.innerHTML = `
    <h3>Top News</h3>
    <ul id="news">      
    </ul>
    <div id="totalNews"></div>
  `;

  const newsHtml = document.getElementById("news");
  const totalNewsHtml = document.getElementById("totalNews");
  
  const request = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const newsJson = await request.json();    
  await getTop5(newsHtml, newsJson);
  totalNewsHtml.innerHTML = `Total news: ${newsJson.length}`;
  
};

async function getTop5( container, news ){
    for(let i=0; i< 5; i++){
        const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${news[i]}.json`);
        const itemJson = await request.json();
        const itemHtml = document.createElement('li')
        itemHtml.innerHTML = `${itemJson.title} <a href='${itemJson.url}' target='_blank'>Ver</a>`;
        container.appendChild(itemHtml);
    }
}