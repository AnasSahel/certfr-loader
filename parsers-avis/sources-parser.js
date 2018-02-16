const cheerio = require('cheerio');

exports.parse = (data) => {
  return { 'sources': cheerio.load(data)('.article-meta .meta-table tr').eq(4).children().last().text().split('\n') };
};
