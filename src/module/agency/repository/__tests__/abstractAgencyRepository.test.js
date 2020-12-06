/* eslint-disable no-undef */
const AbstractAgencyRepository = require('../abstractAgencyRepository');
const AbstractAgencyRepositoryError = require('../error/abstractAgencyRepositoryError');

test('No se puede instanciar un repositorio abstracto', () => {
    let repoInstance;
    try{
        repoInstance = new AbstractAgencyRepository();
    } catch (e) {
        expect(e).toBeInstanceOf(AbstractAgencyRepositoryError);
    } finally {
        expect(repoInstance).toBeUndefined();
    }
});

test ('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
    const ConcreteRepository = class extends AbstractAgencyRepository {};
    const repositoryInstance = new ConcreteRepository();
    expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
    expect(repositoryInstance).toBeInstanceOf(AbstractAgencyRepository);
});
