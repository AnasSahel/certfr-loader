"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
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
        return rxjs_1.Observable.fromPromise(axios_1.default.get(AvisLoader.toUrl(id, year)))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZpcy1sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL0FuYXMvV29ya3NwYWNlL2NlcnRmci9jZXJ0ZnItbG9hZGVyL2xpYi8iLCJzb3VyY2VzIjpbImF2aXMtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0JBQWtDO0FBQ2xDLGtEQUE2QztBQUM3QyxpRUFBd0Q7QUFHeEQ7SUFBQTtRQUNZLFlBQU8sR0FBZSxFQUFFLENBQUM7SUF5Q3JDLENBQUM7SUF2Q0csU0FBUyxDQUFDLE1BQWlCO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxHQUFHLENBQUMsRUFBVSxFQUFFLElBQWE7UUFDekIsTUFBTSxDQUFDLGlCQUFVLENBQUMsV0FBVyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuRSxNQUFNLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQzthQUMzRCxHQUFHLENBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3pDLEdBQUcsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxLQUFLLENBQUMsT0FBZTtRQUN6QixJQUFJLElBQUksR0FBTSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQUU7WUFDdkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBVSxFQUFFLElBQWE7UUFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxJQUFJLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFFakQsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQVUsRUFBRSxJQUFhO1FBQ2xDLE1BQU0sQ0FBQyxpQ0FBaUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN6RSxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBaUIsVUFBc0IscUNBQWM7UUFDNUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxVQUFVLEVBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKIn0=