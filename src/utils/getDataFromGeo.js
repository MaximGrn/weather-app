const getDataFromGeo = (data) => {
  const suggestions = [];

  data.results.forEach((element) => {
    suggestions.push({
      city: element.city,
      country: element.country,
      country_code: element.country_code,
      formatted: element.formatted,
      lat: element.lat,
      lon: element.lon,
    });
  });

  return suggestions;
};

export {
  getDataFromGeo,
};
