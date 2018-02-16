const Rx = require('rxjs/Rx');
const Axios = require('axios');
const fs = require('fs');

exports.get = (id, year) => {
  return Rx.Observable.fromPromise(Axios.get(`${module.exports.toUrl(id, year)}`))
  .filter(response => response.status === 200)
  .map(response => response.data)
  .map(data => module.exports.parse(data));
};

exports.parse = (data) => {
  let cert = {};
  fs.readdirSync(`${__dirname}/parsers-avis`).forEach(file => {
    const parser = require(`./parsers-avis/${file}`);
    cert = Object.assign(cert, parser.parse(data));
  });
  return cert;
};

exports.toId = (id, year) => {
  year = year ? year : (new Date()).getFullYear();

  idStr = "" + id;
  if (idStr.length === 1) idStr = "00" + idStr;
  else if (idStr.length === 2) idStr = "0" + idStr;
  
  return `CERTFR-${year}-AVI-${idStr}`;
};

exports.toUrl = (id, year) => `https://cert.ssi.gouv.fr/avis/${module.exports.toId(id, year)}/`;
