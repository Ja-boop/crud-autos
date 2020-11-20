const AgencyController = require('./controller/agencyController');
const AgencyRepository = require('./repository/sqlite/agencyRepository');
const AgencyService = require('./service/agencyService');

function init(app, container) {
    const controller = container.get('AgencyController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    AgencyController,
    AgencyRepository,
    AgencyService,
};
