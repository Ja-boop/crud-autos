const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const multer = require('multer');
const session = require('express-session');

function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;

    const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: ONE_WEEK_IN_SECONDS },
    };

    return session(sessionOptions);
}

function configureMulter() {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, process.env.CARIMAGE_UPLOAD_DIR);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    return multer({ storage });
}

function addCommonDefinitions(container) {
    container.addDefinitions({
        Session: factory(configureSession),
        Multer: factory(configureMulter),
    });
}

function addAgencyModuleDefinitions(container) {

}

module.export = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addAgencyModuleDefinitions(container);
    return container;
};
