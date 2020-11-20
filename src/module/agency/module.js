const AgencyController = require('./controller/agencyController');
const AgencyRepository = require('./repository/sqlite/agencyRepository');
const AgencyService = require('./service/agencyService');
// const AgencyModel = require('./model/agencyModel');

function init(app, container) {
    const controller = container.get('ClubController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    AgencyController,
    AgencyRepository,
    AgencyService,
};
