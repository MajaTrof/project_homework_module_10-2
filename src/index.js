import './css/styles.css';
import NewRestCountry from './js/fetchCountries.js';
import countriesTPL from './temlates/countries.hbs';
import listCountries from './temlates/listCountries.hbs';
import debounce from './js/debounce.js';
import Notiflix from './js/notiflix.js';

const DEBOUNCE_DELAY = 300;
const newRestCountry = new NewRestCountry();

refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
    'input',
    debounce(() => {
        searchCountry();
    }, DEBOUNCE_DELAY)
);

function searchCountry() {
    newRestCountry.query = (refs.searchBox.value).trim();
    newRestCountry.fetchCountries().then(name => {
        // if (name.length === '') {
        //     console.log('vdvddf');
        //      Notiflix.Notify.info('Please enter a name.');
        //     clearCountreMarkup();
        // }
        if (!name) {
             clearCountreMarkup();
           console.log('errorrrrrrrr');
           Notiflix.Notify.info('Please enter a correct name.');
           
         }
        if (name.length > 10) {
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
            clearCountreMarkup();
        } else if (name.length >= 2 && name.length <= 10) {
            clearCountreMarkup();
            createCountryListItem({name});
            console.log(name);
        } else if (name.length === 1) {
            clearCountreMarkup();
            appendCountryMarkup({name});
        }
    });
}

function appendCountryMarkup(name) {
    const countryMarkup = countriesTPL(name);
    refs.countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
    console.log('countriesTPL', name);
}

function createCountryListItem(name) {
    const listItem = listCountries(name);
    refs.countryList.innerHTML = '';
    refs.countryList.insertAdjacentHTML('beforeend', listItem);
    console.log('listItem', listItem);
}

function clearCountreMarkup() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    console.clear();
}