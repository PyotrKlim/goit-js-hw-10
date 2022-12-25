const BASE_URL = `https://restcountries.com/v3.1/name`;

function fetchCountry(countryName) {
  return fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`
  ).then(r => r.json());
}

export default { fetchCountry };
