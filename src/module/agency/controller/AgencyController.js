const { fromDataToEntity } = require('../mapper/autoMapper');
const CarIDNotDefinedEroor = require('../repository/error/carIDNotDefinedError');
const AbstractController = require('../controller/abstractController');

module.exports = class AgencyController extends AbstractController {
    /**
     * @param {import('../service/agencyService')} agencyService
     */
    constructor(uploadMiddleware, agencyService) {
        super();
        this.ROUTE_BASE = '/agency';
        this.uploadMiddleware = uploadMiddleware;
        this.agencyService = agencyService;
    }

    /**
     * @param {import('express').Application} app
     */
    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE;
        
        app.get(`${ROUTE}/create/car`, this.create.bind(this));
        app.get(`${ROUTE}`, this.index.bind(this));
        // app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        // app.post(`${ROUTE}/save`, this.uploadMiddleware.single('image_url'), this.save.bind(this));
        // app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const cars = await this.agencyService.getAll();
        const { errors, messages } = req.session;
        res.render('views/home.njk', { data: { cars }, messages, errors, logo: "/public/logo/logo-luzny.png", github: "https://github.com/Ja-boop/crud-autos" });
        req.session.errors = [];
        req.session.messages = [];
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async create(req, res) {
        res.render('views/form.njk', { logo: "/public/logo/logo-luzny.png", github: "https://github.com/Ja-boop/crud-autos" });
    }
};
