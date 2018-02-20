const expect = require('chai').expect;
const loader = require('../certfr-avis');

describe('Validate parsers', () => {
    let bulletin = null;
    const id = 84;
    const title = 'Multiples vulnérabilités dans Microsoft IE';

    before(function(done) {
        this.timeout(5000);

        loader.get(id).subscribe(data => {
            bulletin = data;
            done();
        });
    });

    it('Validate reference parser', () => {
        expect(bulletin).to.have.property('reference').with.equal(loader.toId(id));
    });

    it('Validate title parser', () => {
        expect(bulletin).to.have.property('title').with.equal(title);
    });

    it('Validate timestamp first version parser', () => {
        expect(bulletin).to.have.property('timestampFirstVersion').with.to.be.a('number');
    });

    it('Validate timestamp last version parser', () => {
        expect(bulletin).to.have.property('timestampLastVersion').with.to.be.a('number');
    });

    it('Validate sources parser', () => {
        expect(bulletin).to.have.property('sources')
        .with.to.be.a('array').with.lengthOf(1);
    });

    it('Validate risks parser', () => {
        expect(bulletin).to.have.property('risks')
        .with.to.be.a('array').with.lengthOf(1);
    });

    it('Validate affected systemes parser', () => {
        expect(bulletin).to.have.property('affectedSystems')
        .with.to.be.a('array').with.lengthOf(3);
    });

    it('Validate documentation parser', () => {
        expect(bulletin).to.have.property('documentation')
        .with.to.be.a('array').with.lengthOf(1);

        expect(bulletin.documentation[0]).to.have.property('id')
        .with.equal('Bulletin de sécurité Microsoft du 13 février 2018');

        expect(bulletin.documentation[0]).to.have.property('href')
        .with.equal('https://portal.msrc.microsoft.com/fr-FR/security-guidance');
    });

    it('Validate cve parser', () => {
        expect(bulletin).to.have.property('cve')
        .with.to.be.a('array').with.lengthOf(2);

        expect(bulletin.cve[0]).to.have.property('id')
        .with.equal('CVE-2018-0840');

        expect(bulletin.cve[0]).to.have.property('href')
        .with.equal('http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-0840');

        expect(bulletin.cve[1]).to.have.property('id')
        .with.equal('CVE-2018-0866');

        expect(bulletin.cve[1]).to.have.property('href')
        .with.equal('http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-0866');
    });
});
