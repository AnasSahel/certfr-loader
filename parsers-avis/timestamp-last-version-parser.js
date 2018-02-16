const cheerio = require('cheerio');

const months = ["janvier", "février", "mars", "avril", "mai", "juin",
              "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

exports.parse = (data) => {
  const d = cheerio.load(data)('.article-meta .meta-table tr').eq(3).children().last().text().split(" ");

  const day = parseInt(d[0]);
  const year = parseInt(d[2]);
  const month = months.indexOf(d[1]);

  return { 'timestampLastVersion': (new Date(year, month, day)).getTime() };
};
