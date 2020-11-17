const AgencyController = require('./controller/AgencyController');
const AgencyRepository = require('./repository/sqlite/AgencyRepository');
const AgencyService = require('./service/AgencyService');
const AgencyModel = require('./model/AgencyModel');

function init(app, container) {
    const controller = container.get('ClubController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    AgencyController,
    AgencyRepository,
    AgencyService,
    AgencyModel,
};
