const cheerio = require('cheerio');

exports.parse = (data) => {
  return { 'reference': cheerio.load(data)('.article-meta .meta-table tr').eq(0).children().last().text() };
};
