const { default: DIContainer, object, get, factory } = require('rsdi');
const multer = require('multer');
const session = require('cookie-session');

function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;

    const sessionOptions = {
        name: 'cookieSession',
        secret: process.env.SESSION_SECRET,
        maxAge: ONE_WEEK_IN_SECONDS,
    };

    return session(sessionOptions);
}


function addCommonDefinitions(container) {
    container.addDefinitions({
        Session: factory(configureSession),
        Multer: factory(configureMulter),
    });
}

module.export = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addAgencyModuleDefinitions(container);
    return container;
};
