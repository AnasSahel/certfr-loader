import { Avis } from "./avis";
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
