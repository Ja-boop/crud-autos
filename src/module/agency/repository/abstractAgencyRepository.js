const AbstractAgencyRepositoryError = require('../repository/error/abstractAgencyRepositoryError');

module.exports = class AbstractAgencyRepository {
    constructor() {
        if (new.target === AbstractAgencyRepository) {
            throw new AbstractAgencyRepositoryError(
                'No se puede instanciar el repositorio abstracto de la agencia.'
            )
        }
    }

    async save(auto) {}

    async delete(id) {}

    async getById(id) {}

    async getAll() {}
};
