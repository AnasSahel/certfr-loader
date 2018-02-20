const expect = require('chai').expect;
const loader = require('../certfr-avis');

describe('Certfr Avis utils functions', () => {
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
});

describe('Get avis from CERTFR', () => {
  it('Get avis without year', function(done) {
    this.timeout(10000);
    loader.get(81).subscribe(bulletin => {
      expect(bulletin).to.be.an('object');
      expect(bulletin).to.have.property('reference').with.equal(loader.toId(81));
      done();
    });
  });

  it('Get avis with year', function(done) {
    this.timeout(10000);
    loader.get(81, 2017).subscribe(bulletin => {
      expect(bulletin).to.be.an('object');
      expect(bulletin).to.have.property('reference').with.equal(loader.toId(81, 2017));
      done();
    });
  });
});
