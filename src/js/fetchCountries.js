import Notiflix from './notiflix.js';

const BASE_URL = 'https://restcountries.com/v3.1';

export default class NewRestCountry {
  constructor() {
    this.countryInput = '';
  }

  fetchCountries() {
    // if (!this.countryInput) {
    //   return Notiflix.Notify.failure('Unable to fetch country data');
    // }

    let url = `${BASE_URL}/name/${this.query}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }}).catch(error => Notiflix.Notify.failure('Unable to fetch country data'));
  }

  get query() {
    return this.countryInput;
  }

  set query(newQuery) {
    this.countryInput = newQuery;
  }
}
