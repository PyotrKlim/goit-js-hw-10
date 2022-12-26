const BASE_URL = `https://restcountries.com/v3.1/name`;

function fetchCountry(countryName) {
  return fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`
  ).then(res => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Oops, there is no country with that name.');
  });
}

export { fetchCountry };
