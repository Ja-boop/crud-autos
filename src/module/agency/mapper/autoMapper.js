const Car = require('../entity/car');

function fromDataToEntity({
    id,
    brand,
    model,
    image_url: imageURL,
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
        imageURL,
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
