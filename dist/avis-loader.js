"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Rx_1 = require("rxjs/Rx");
const axios_1 = __importDefault(require("axios"));
const avis_default_parsers_1 = require("./avis-default-parsers");
class AvisLoader {
    constructor() {
        this.parsers = [];
    }
    addParser(parser) {
        this.parsers.push(parser);
    }
    get(id, year) {
        return Rx_1.Observable.fromPromise(axios_1.default.get(AvisLoader.toUrl(id, year)))
            .filter((value) => value.status === 200)
            .map((value) => value.data)
            .map((value) => this.parse(value));
    }
    parse(rawData) {
        let avis = {};
        this.parsers.forEach((parser) => {
            parser(rawData, avis);
        });
        return avis;
    }
    static toId(id, year) {
        year = year ? year : (new Date()).getFullYear();
        let idStr = "" + id;
        if (idStr.length === 1)
            idStr = "00" + idStr;
        else if (idStr.length === 2)
            idStr = "0" + idStr;
        return `CERTFR-${year}-AVI-${idStr}`;
    }
    static toUrl(id, year) {
        return `https://cert.ssi.gouv.fr/avis/${AvisLoader.toId(id, year)}/`;
    }
    static init(parsers = avis_default_parsers_1.DefaultParsers) {
        const a = new AvisLoader();
        a.parsers = parsers;
        return a;
    }
}
exports.AvisLoader = AvisLoader;
