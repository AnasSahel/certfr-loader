import Cheerio from "cheerio";
import { Parsers, Avis } from ".";

const months = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];


export const DefaultParsers: Parsers<Avis> = [
    // Reference
    (rawData: string, current: Avis): void => {
        current.reference = Cheerio.load(rawData)('.article-meta .meta-table tr').eq(0).children().last().text();
    },

    // Title
    (rawData: string, current: Avis): void => {
        current.title = Cheerio.load(rawData)('.article-meta .meta-table tr').eq(1).children().last().text();
    },

    // System
    (rawData: string, current: Avis): void => {
        const title = current.title;

        if (title.startsWith("Multiples vulnérabilités dans le noyau Linux de ")) {
            current.system = title.replace("Multiples vulnérabilités dans le noyau Linux de ", "");
        } else if (title.startsWith("Multiples vulnérabilités dans le noyau Linux d’")) {
            current.system = title.replace("Multiples vulnérabilités dans le noyau Linux d’", "");
        } else if (title.startsWith("Multiples vulnérabilités dans les produits ")) {
            current.system = title.replace("Multiples vulnérabilités dans les produits ", "");
        } else if (title.startsWith("Multiples vulnérabilités dans ")) {
            current.system = title.replace("Multiples vulnérabilités dans ", "");
        } else if (title.startsWith("Vulnérabilité dans le noyau Linux d’")) {
            current.system = title.replace("Vulnérabilité dans le noyau Linux d’", "");
        } else if (title.startsWith("Vulnérabilité dans le noyau Linux de ")) {
            current.system = title.replace("Vulnérabilité dans le noyau Linux de ", "");
        } else if (title.startsWith("Vulnérabilité dans ")) {
            current.system = title.replace("Vulnérabilité dans ", "");
        }
    },

    // Risks
    (rawData: string, current: Avis): void => {
        current.risks = [];

        const $ = Cheerio.load(rawData);

        $('.article-content > div > div')
            .children('h2').
            filter((i, elt) => $(elt).text() === 'Risque(s)')
            .next()
            .children('li')
            .each((i, elt) => { current.risks.push($(elt).text()) });
    },

    // Sources
    (rawData: string, current: Avis): void => {
        current.sources = Cheerio.load(rawData)('.article-meta .meta-table tr').eq(4).children().last().text().split('\n');
    },

    // Timestamp first version
    (rawData: string, current: Avis): void => {
        const d = Cheerio.load(rawData)('.article-meta .meta-table tr').eq(2).children().last().text().split(" ");

        const day = parseInt(d[0]);
        const year = parseInt(d[2]);
        const month = months.indexOf(d[1]);

        current.timestampFirstVersion = (new Date(year, month, day)).getTime();
    },

    // Timestamp last version
    (rawData: string, current: Avis): void => {
        const d = Cheerio.load(rawData)('.article-meta .meta-table tr').eq(3).children().last().text().split(" ");

        const day = parseInt(d[0]);
        const year = parseInt(d[2]);
        const month = months.indexOf(d[1]);

        current.timestampLastVersion = (new Date(year, month, day)).getTime();
    },

    // Affected systems
    (rawData: string, current: Avis): void => {
        current.affectedSys = [];

        const $ = Cheerio.load(rawData);

        $('.article-content > div > div')
            .children('h2')
            .filter((i, elt) => $(elt).text() === 'Systèmes affectés')
            .next()
            .children('li')
            .each((i: number, elt: CheerioElement) => { current.affectedSys.push($(elt).text()) });
    },

    // Documentation
    (rawData: string, current: Avis): void => {
        current.documentation = [];

        const $ = Cheerio.load(rawData);

        $('.article-content > div > div')
            .children('h2').
            filter((i, elt) => $(elt).text() === 'Documentation')
            .next()
            .children('li')
            .filter((i, el) => !$(el).text().startsWith('Référence CVE CVE-'))
            .each((i, el) => {
                const splittedDoc = $(el).text().split('http');
                current.documentation.push({
                    id: splittedDoc[0].trim(),
                    href: `http${splittedDoc[1].trim()}`
                });
            });
    },

    // CVEs
    (rawData: string, current: Avis): void => {
        current.cve = [];
        const $ = Cheerio.load(rawData);

        $('.article-content > div > div')
            .children('h2').
            filter((i, elt) => $(elt).text() === 'Documentation')
            .next()
            .children('li')
            .filter((i: number, el: CheerioElement) => $(el).text().startsWith('Référence CVE CVE-'))
            .each((i: number, el: CheerioElement) => {
                const splittedCve = $(el).text().replace('Référence CVE ', '').split(/\s+/);
                current.cve.push({
                    id: splittedCve[0].trim(),
                    href: splittedCve[1].trim()
                });
            });
    }
];
