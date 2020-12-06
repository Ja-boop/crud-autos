const { fromDataToEntity } = require('../mapper/carMapper');
const CarIDNotDefinedEroor = require('../repository/error/carIDNotDefinedError');
const AbstractController = require('./abstractController');

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
        app.post(`${ROUTE}/save`, this.uploadMiddleware.single('image_url'), this.save.bind(this));
        // app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        // app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const car = await this.agencyService.getAll();
        const { errors, messages } = req.session;
        res.render('views/home.njk', { data: { car }, messages, errors, logo: "/public/logo/logo-luzny.png", github: "https://github.com/Ja-boop/crud-autos" })
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

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res 
     */
    async save(req, res) {
        try {
            const car = fromDataToEntity(req.body);
            if(req.file) {
                const { path } = req.file;
                car.imageUrl = path;
            }
            const savedCar = await this.agencyService.save(car);
            if (car.id) {
                req.session.messages = [`El auto con ID ${car.id} se actualizó correctamente`];
            } else {
                req.session.messages = [`Se creo el auto con id ${savedCar.id} (${savedCar.name})`];
            }
            res.redirect('/');
        } catch (e) {
            req.session.errors = [e.messages, e.stack];
            res.redirect('/');
        }
    }
};
