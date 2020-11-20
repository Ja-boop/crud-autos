const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const multer = require('multer');
const session = require('express-session');
const { AgencyController, AgencyService, AgencyRepository } = require('../module/agency/module');
const Sqlite3Database = require('better-sqlite3');

function configureMainDatabaseAdapter() {
    return new Sqlite3Database(process.env.DB_PATH, {
        verbose: console.log,
    });
}

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
        MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    });
}

function addAgencyModuleDefinitions(container) {
    container.addDefinitions({
        AgencyController: object(AgencyController).construct(get('Multer'), get('AgencyService')),
        AgencyService: object(AgencyService).construct(get('AgencyRepository')),
        AgencyRepository: object(AgencyRepository).construct(get('MainDatabaseAdapter'))
    })
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addAgencyModuleDefinitions(container);
    return container;
};
