# certfr-loader
A Node.js module to download vulnerabilities from CERTFR (https://www.cert.ssi.gouv.fr/avis/).
TODO: out-dated

## Getting started
The process is based on parsing the raw data to extract usefull information:

* Reference of the element
* Title of the element
* Date of the first version
* Date of the last version
* Sources of the element
* Risks
* System
* Systems affected by this vulnerability
* Documentation, which may contain CVE references
* CVE references related to the vulnerability

### Installing
```
npm install a-sahel/certfr-loader --save
```

### Example
```
import { AvisLoader } from "./certfr-loader";

let avisLoader = new AvisLoader();

avisLoader.get(118).then(value => {
    console.log(value.system);
});
```

## Testing (TODO)
To run tests, run the command
```
npm test
```

## Author
* Anas SAHEL

## License
This project is licenced under Apache 2.0 -- see the [LICENSE.md](LICENSE.md) file for details.
