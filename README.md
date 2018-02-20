# certfr-loader
A Node.js module to download vulnerabilities from CERTFR (https://www.cert.ssi.gouv.fr/avis/).

## Getting started
The process is based on parsing the raw data to extract usefull information:

* Reference of the element
* Title of the element
* Date of the first version
* Date of the last version
* Sources of the element
* Risks
* Systems affected by this vulnerability
* Documentation, which may contain CVE references
* CVE references related to the vulnerability

### Installing
```
npm install a-sahel/certfr-loader --save
```

### Example
```
const certfrLoader = require('certfr-loader');

// Get the vulnerability with the ID 81
certfrLoader.avis.get(81).subscribe(data => console.log(data));

// Get the vulnerability with the ID 81 of year 2017
certfrLoader.avis.get(81, 2017).subscribe(data => console.log(data));
```

## Testing
To run tests, run the command
```
npm test
```

## Author
* Anas SAHEL

## License
This project is licenced under Apache 2.0 -- see the [LICENSE.md](LICENSE.md) file for details.
