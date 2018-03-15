import { AvisLoader } from "./avis-loader";
import { Avis } from "./avis";

interface Toto extends Avis { z: string; }

const avisLoader = AvisLoader.init<Toto>();

avisLoader.get(118).subscribe((value: Avis) => {
    console.log(value.system);
});
