const cheerio = require('cheerio');

exports.parse = (data) => {
  const $ = cheerio.load(data);

  const solution = $('.article-content > div > div')
    .children('h2').
    filter((i, elt) => $(elt).text() === 'Solution')
    .next()
    .text();

  return { 'solution': solution };
};
