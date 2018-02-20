const cheerio = require('cheerio');

exports.parse = (data) => {
  let documentation = [];
  const $ = cheerio.load(data);

  $('.article-content > div > div')
    .children('h2').
    filter((i, elt) => $(elt).text() === 'Documentation')
    .next()
    .children('li')
    .filter((i, el) => !$(el).text().startsWith('Référence CVE CVE-'))
    .each((i, el) => {
      const splittedDoc = $(el).text().split('http');
      documentation.push({
        id: splittedDoc[0].trim(),
        href: `http${splittedDoc[1].trim()}`
      });
    });

  return { 'documentation': documentation };
};
