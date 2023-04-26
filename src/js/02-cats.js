import articlesTPL from '../temlates/articles.hbs';
import NewsApiService from './news-servise.js';


const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

   
    newsApiService.query = e.currentTarget.elements.query.value;
    if (newsApiService.query === '') {
        return alert(`error`);
   }
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(articles => {
         clearArticleContainer();
        appendArticleMarkup({articles});
    });
}

function onLoadMore() {
  newsApiService.fetchArticles().then(articles => {
    appendArticleMarkup({ articles });
  });
}

function appendArticleMarkup(articles) {
    const articleMarkup = articlesTPL(articles);
    refs.articlesContainer.insertAdjacentHTML('beforeend', articleMarkup);
    console.log('ap', articles);
}

function clearArticleContainer() {
  refs.articlesContainer.innerHTML = '';
}
