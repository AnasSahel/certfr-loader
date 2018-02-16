const cheerio = require('cheerio');

exports.parse = (data) => {
  let risques = [];
  const $ = cheerio.load(data);

  $('.article-content > div > div')
    .children('h2').
    filter((i, elt) => $(elt).text() === 'Risque(s)')
    .next()
    .children('li')
    .each((i, elt) => { risques.push($(elt).text()) });

  return { 'risks': risques };
};
