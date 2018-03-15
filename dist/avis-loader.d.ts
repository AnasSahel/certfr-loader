import { Parsers, Parser } from "./avis-types";
import { Observable } from "rxjs/Rx";
import { Avis } from "./avis";
export declare class AvisLoader<T extends Avis> {
    private parsers;
    addParser(parser: Parser<T>): void;
    get(id: number, year?: number): Observable<T>;
    private parse(rawData);
    static toId(id: number, year?: number): string;
    static toUrl(id: number, year?: number): string;
    static init<T extends Avis>(parsers?: Parsers<T>): AvisLoader<T>;
}
