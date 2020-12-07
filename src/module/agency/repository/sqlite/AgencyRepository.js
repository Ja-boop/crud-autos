const { fromDataToEntity } = require('../../mapper/carMapper');
const AbstractAgencyRepository = require('../abstractAgencyRepository');
const CarNotFoundError = require('../error/carNotFoundError');
const CarIdNotDefinedError = require('../error/carIDNotDefinedError');

module.exports = class AgencyRepository extends AbstractAgencyRepository {
    /**
     * @param {import('better-sqlite3').Database} databaseAdapter 
     */
    constructor(databaseAdapter) {
        super();
        this.databaseAdapter = databaseAdapter;
    }
     /**
     * @param {import('../../entity/car')} car
     * @returns {import('../../entity/car')}
     */
    save(car) {
        let id;
        if (car.id) {
            id = car.id;
            const statement = this.databaseAdapter.prepare(`
                UPDATE lista_vehiculos SET
                    ${car.imageUrl ? `image_url = ?,` : ''}
                    brand = ?,
                    model = ?,
                    year_manufactured = ?,
                    kms = ?,
                    color = ?,
                    air_conditioner = ?,
                    passengers = ?,
                    transmission = ?
                WHERE id = ?
            `);

            const params = [
                car.brand,
                car.model,
                car.yearManufactured,
                car.kms,
                car.color,
                car.airConditioner,
                car.passengers,
                car.transmission,
            ];

            if (car.imageUrl) {
                params.unshift(car.imageUrl);
            }

            statement.run(params);
        } else {
            const statement = this.databaseAdapter.prepare(`
                INSERT INTO lista_vehiculos(
                    brand,
                    model,
                    image_url,
                    year_manufactured,
                    kms,
                    color,
                    air_conditioner,
                    passengers,
                    transmission
                ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const result = statement.run(
                car.brand,
                car.model,
                car.imageUrl,
                car.yearManufactured,
                car.kms,
                car.color,
                car.airConditioner,
                car.passengers,
                car.transmission
            );

            id = result.lastInsertRowid;
        }

        return this.getById(id);
    }

    /**
   * @param {import('../../entity/car')} car
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
    delete(car) {
        if(!car || !car.id) {
            throw new CarIdNotDefinedError('El ID del auto no esta definido');
        }

        this.databaseAdapter.prepare('DELETE FROM lista_vehiculos WHERE id = ?').run(car.id);

        return true;
    }

    async getById(id) {
        const car = this.databaseAdapter
        .prepare(
            `SELECT
            id,
            brand,
            model,
            image_url,
            year_manufactured,
            kms,
            color,
            air_conditioner,
            passengers,
            transmission
            FROM lista_vehiculos WHERE id = ?`
        )
        .get(id);

        if (car === undefined) {
            throw new CarNotFoundError(`No se encontro el auto con ID: ${id}`)
        }

        return fromDataToEntity(car);
    }

    /**
     * @return {Array<import('../../entity/car')}
     */
    getAll() {
        const cars = this.databaseAdapter
        .prepare(
            `SELECT
            id,
            brand,
            model,
            image_url,
            year_manufactured,
            kms,
            color,
            air_conditioner,
            passengers,
            transmission
            FROM lista_vehiculos`
        )
        .all();
        return cars.map((carData) => fromDataToEntity(carData));
    }
};
