/**
 * @typedef {import('../repository/abstractAgencyRepository')} AbstractAgencyRepository
*/

const CarNotDefinedError = require('./error/carNotDefinedError');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');
const Car = require('../entity/car');

module.exports = class Service {
    /**
     * @param {AbstractAgencyRepository} agencyRepository
     */
    constructor(agencyRepository) {
        this.agencyRepository = agencyRepository;
    }

    /**
     * @param {Car} car
     */
    async save(car) {
        if (car === undefined) {
            throw new CarNotDefinedError();
        }

        return this.agencyRepository.save(car);
    }

    /**
     * @param {Car} car
     */
    async delete(car) {
        if(!(car instanceof Car)) {
            throw new CarNotDefinedError();
        }

        return this.agencyRepository.delete(car);
    }

    async getById(id) {
        if(id === undefined) {
            throw new CarIdNotDefinedError();
        }

        return this.agencyRepository.getById(id);
    }

    async getAll() {
        return this.agencyRepository.getAll();
    }
};