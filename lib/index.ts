import { AvisLoader } from ".";

export * from "./avis-loader";

AvisLoader.lastId().subscribe((id: string) => console.log(id));