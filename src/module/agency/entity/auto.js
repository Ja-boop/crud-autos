module.exports = class Auto {
    constructor({
        id,
        brand,
        model,
        year_manufactured,
        kms,
        color,
        air_conditioner,
        passengers,
        transmission,

    }) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year_manufactured = year_manufactured;
        this.kms = kms;
        this.color = color;
        this.air_conditioner = air_conditioner;
        this.passengers = passengers;
        this.transmission = transmission;
    }
};