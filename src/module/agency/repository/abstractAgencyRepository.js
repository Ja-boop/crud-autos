/* eslint-disable no-unused-vars */
const AbstractAgencyRepositoryError = require('../repository/error/abstractAgencyRepositoryError');

module.exports = class AbstractAgencyRepository {
    constructor() {
        if (new.target === AbstractAgencyRepository) {
            throw new AbstractAgencyRepositoryError(
                'No se puede instanciar el repositorio abstracto de la agencia.'
            )
        }
    }

    /**
     * @param {import('../entity/car')} car 
     * @returns {import('../entity/car')}
     */
    async save(car) {}

    /**
     * @param {Number} id 
     */
    async delete(id) {}

    /**
     * @param {Number} id 
     * @returns {import('../entity/car')}
     */
    async getById(id) {}

    /**
     * @returns {Array<import('../entity/car')>}
     */
    async getAll() {}
};
