export default interface Avis {
    reference: string;
    title: string;
    system: string;
    risks: string[];
    sources: string[];
    timestampFirstVersion: number;
    timestampLastVersion: number;
    affectedSys: string[];
    documentation: Documentation[];
    cve: CVE[];
}
export declare type Parser<T extends Avis> = (rawData: string, current: T) => void;
export declare type Parsers<T extends Avis> = Array<Parser<T>>;
export declare type CVE = {
    id: string;
    href: string;
};
export declare type Documentation = {
    id: string;
    href: string;
};
