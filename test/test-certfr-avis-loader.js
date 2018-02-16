const expect = require('chai').expect;
const loader = require('../certfr-avis');

describe('Certfr Avis Loader', () => {
  describe('Format ID', () => {
    it('Format 1-length id integer without year', () => {
      expect(loader.toId(1)).to.be.equal('CERTFR-2018-AVI-001');
    });

    it('Format 1-length id integer with year', () => {
      expect(loader.toId(9, 2017)).to.be.equal('CERTFR-2017-AVI-009');
    });

    it('Format 2-length id integer without year', () => {
      expect(loader.toId(21)).to.be.equal('CERTFR-2018-AVI-021');
    });

    it('Format 2-length id integer with year', () => {
      expect(loader.toId(13, 2017)).to.be.equal('CERTFR-2017-AVI-013');
    });

    it('Format 3-length id integer without year', () => {
      expect(loader.toId(123)).to.be.equal('CERTFR-2018-AVI-123');
    });

    it('Format 3-length id integer with year', () => {
      expect(loader.toId(981, 2017)).to.be.equal('CERTFR-2017-AVI-981');
    });
  });

  describe('Format URL', () => {
    it('Format URL without year', () => {
      expect(loader.toUrl(80))
      .to.be.equal('https://cert.ssi.gouv.fr/avis/CERTFR-2018-AVI-080/');
    });

    it('Format URL with year', () => {
      expect(loader.toUrl(1, 2017))
      .to.be.equal('https://cert.ssi.gouv.fr/avis/CERTFR-2017-AVI-001/');
    });
  });

  describe('Validate bulletin type and parsing', () => {
    it('Bulletin is of type object', (done) => {
      loader.get(81).subscribe(bulletin => {
        expect(bulletin).to.be.an("object");
        done();
      });
    });

    it('Validate parsing without year', (done) => {
      loader.get(88).subscribe(bulletin => {
        expect(bulletin).to.haveOwnProperty('reference');
        expect(bulletin).to.haveOwnProperty('title');
        expect(bulletin).to.haveOwnProperty('timestampFirstVersion');
        expect(bulletin).to.haveOwnProperty('timestampLastVersion');
        expect(bulletin).to.haveOwnProperty('sources').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('risks').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('affectedSystems').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('solution');
        expect(bulletin).to.haveOwnProperty('documentation').and.to.be.an("array");
        expect(bulletin.reference).to.be.equal('CERTFR-2018-AVI-088');
        done();
      });
    });

    it('Validate parsing with year', (done) => {
      loader.get(112, 2017).subscribe(bulletin => {
        expect(bulletin).to.haveOwnProperty('reference');
        expect(bulletin).to.haveOwnProperty('title');
        expect(bulletin).to.haveOwnProperty('timestampFirstVersion');
        expect(bulletin).to.haveOwnProperty('timestampLastVersion');
        expect(bulletin).to.haveOwnProperty('sources').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('risks').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('affectedSystems').and.to.be.an("array");
        expect(bulletin).to.haveOwnProperty('solution');
        expect(bulletin).to.haveOwnProperty('documentation').and.to.be.an("array");
        expect(bulletin.reference).to.be.equal('CERTFR-2017-AVI-112');
        done();
      });
    });
  });
});
