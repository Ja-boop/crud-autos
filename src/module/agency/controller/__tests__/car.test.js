/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const AgencyController = require('../agencyController');
const Car = require('../../entity/car');
const { render } = require('nunjucks');

const serviceMock = {
    save: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getById: jest.fn(() => Promise.resolve({})),
    getAll: jest.fn(() => Promise.resolve([])),
};
const controller = new AgencyController({}, serviceMock, serviceMock);

test('index renderea home.njk', async () => {
    const renderMock = jest.fn();

    await controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('views/home.njk', {
        data: { car: [] },
        errors: [],
        messages: [],
        logo: "/public/logo/logo-luzny.png",
        github: "https://github.com/Ja-boop/crud-autos",
    });
});
