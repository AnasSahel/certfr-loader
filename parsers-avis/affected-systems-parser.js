const cheerio = require('cheerio');

exports.parse = (data) => {
  let systemesAffectes = [];
  const $ = cheerio.load(data);

  $('.article-content > div > div')
    .children('h2')
    .filter((i, elt) => $(elt).text() === 'Systèmes affectés')
    .next()
    .children('li')
    .each((i, elt) => { systemesAffectes.push({ ref: $(elt).text() }) });

  return { 'affectedSystems': systemesAffectes };
};
