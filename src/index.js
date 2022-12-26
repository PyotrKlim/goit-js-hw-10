import '~node_modules/modern-normalize/modern-normalize.css';
import './css/styles.css';
import countryCard from './templates/countryTemplate.hbs';
import countryListMarkup from './templates/countryListMarkup.hbs';
import { fetchCountry as api } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

let searchCountryName = '';

inputField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  searchCountryName = inputField.value.trim();

  if (searchCountryName === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  api(searchCountryName)
    .then(countryNames => {
      if (countryNames.length === 1) {
        countryList.innerHTML = '';
        renderCountryCard(countryNames);
        Notiflix.Notify.success('Please see your result');
        return;
      }
      if (countryNames.length < 10 && countryNames.length > 1) {
        countryInfo.innerHTML = '';
        renderCountryList(countryNames);
        Notiflix.Notify.success('Please see your result');
        return;
      }
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    })
    .catch(error => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.failure(error);
    });
}

function renderCountryCard(country) {
  const markup = countryCard(country[0]);
  countryInfo.innerHTML = markup;
}

function renderCountryList(country) {
  const renderList = country.map(c => [c.name.official, c.flags.svg]);
  console.log(renderList);
  const markup = countryListMarkup(renderList);
  countryList.innerHTML = markup;
}
