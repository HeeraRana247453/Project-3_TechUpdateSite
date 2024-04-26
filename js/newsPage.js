//const API_KEY = "ab0d88712b8e4f3794a9322ab0cd8274";
//const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&from=2024-04-20&apiKey=${API_KEY}`);  //&from=2024-04-24&sortBy=Tech
    const data = await res.json();
    console.log(data);

    bindData(data.articles); //call
}

function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";


    articles.forEach((article) => {
        // List of known Chinese news sources
        // const chineseSources = ["Faz.net","Uol.com.br","Giga","Génération NT","Le Monde","Www.nzz.ch","Xatakahome.com","Presse-citron","Xataka Android","La Vanguardia","Olhardigital.com.br","Sapo.pt","Courrier International","Macmagazine.com.br","Xatakamovil.com","tagesschau.de","Antyweb.pl","Tecnoblog.net", "Hipertextual","Melhoresdestinos.com.br","Clubic","Nextpit.de","Presse-citronHipertextual","Journal du geek","01net.com","Marketingdirecto.com","La VanguardiaClubic","Impress.co.jp" ,"Tomshw.it","Numerama","Gizmodo.com","Esuteru.com","Yahoo Entertainment","Feber.se","cctv","Les Numériques","xinhua-net", "people-daily","Gizmodo.jp","CNET","Ifanr.com","Asahi.com","Xataka.com","heise online","Caschys Blog","Frandroid","Itainews.com","Wired.jp"];
        // Skip if the article is from a Chinese source
        //  if (chineseSources.includes(article.source.name)) return;

        const indianSources = ["defencexp.com", "Gizmodo.com", "NPR", "Business Insider", "Hackaday", "MacRumors", "AppleInsider", "Android Police", "VentureBeat", "CNET", "Openculture.com", "BBC News", "ReadWrite", "New York Post", "Time", "Android Central", "ABC News", "CNN", "The Times Of India", "NDTV", "BCC", "The Hindu", "The Indian Express", "Hindustan Times", "Tech Crunch"];
        if (!indianSources.includes(article.source.name)) return;

        // articles.forEach((article) => {
        //     if(!article.urlToImage) return;

        //     const cardClone = newsCardTemplate.content.cloneNode(true);
        //     fillDataInCard(cardClone,article);  //call
        //     cardsContainer.appendChild(cardClone);
        // });


        if (!article.urlToImage) return;

        // Create a new image element
        var img = new Image();
        img.src = article.urlToImage;

        img.onload = function () {
            // The image loaded successfully, add the article
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);  //call
            cardsContainer.appendChild(cardClone);
        };

        img.onerror = function () {
            // The image failed to load, skip this article
            console.log('Image failed to load:', article.urlToImage);
        };
    });
}

function fillDataInCard(cardClone, article) {
    //query Selectors of cloneCard
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsContent = cardClone.querySelector('#news-content');
    const newsSource = cardClone.querySelector('#news-source');
    //set values of article in cloneCard
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsContent.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    newsSource.innerHTML = `${article.source.name} (${date})`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


const parentSearchText = document.getElementById("searchBox");
//currently active nav-tab
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

    parentSearchText.value = id;
}
//search result
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {

    const query = searchText.value;
    if (!query) return;
    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;

    parentSearchText.value = searchText.value;
    searchText.value = null;
});