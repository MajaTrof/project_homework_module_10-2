const API_KEY = '1035db632b644301ba21f4d60cd9087b';
const BASE_URL = 'https://newsapi.org/v2';

export default class NewsApiService {
  constructor() {
      this.searchQuery = '';
      this.page = 1;
  }

    fetchArticles() {
        console.log('до', this);
    const options = {
      headers: {
        Authorization: API_KEY,
      },
    };
    let url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({articles}) => {
        this.incrementPage();

        return articles;
      });
    }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
