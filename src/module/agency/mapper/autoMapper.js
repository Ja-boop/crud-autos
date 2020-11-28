const Car = require('../entity/car');

/**
 *
 * @param {Object} formData
 * @returns Car
 */
function fromDataToEntity({
    id,
    brand,
    model,
    image_url: imageUrl,
    year_manufactured: yearManufactured,
    kms,
    color,
    air_conditioner: airConditioner,
    passengers,
    transmission,
}) {
    return new Car({
        id: Number(id),
        brand,
        model,
        imageUrl,
        yearManufactured,
        kms,
        color,
        airConditioner,
        passengers,
        transmission,
    });
}

module.exports = {
    fromDataToEntity,
};
