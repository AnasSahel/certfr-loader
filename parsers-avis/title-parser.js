const cheerio = require('cheerio');

exports.parse = (data) => {
  return { 'title': cheerio.load(data)('.article-meta .meta-table tr').eq(1).children().last().text() };
};
