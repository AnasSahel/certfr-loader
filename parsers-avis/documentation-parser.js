const cheerio = require('cheerio');

exports.parse = (data) => {
  let documentation = [];
  const $ = cheerio.load(data);

  $('.article-content > div > div')
    .children('h2').
    filter((i, elt) => $(elt).text() === 'Documentation')
    .next()
    .children('li')
    .each((i, elt) => documentation.push($(elt).text().replace('\n', '')));

  return { 'documentation': documentation };
};
