import validate from 'express-joi-validator';
import apiValidator from '../validators/api.validator';
import { Router } from 'express';
import apiController from '../controllers/ApiController';

class ApiRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/emails', validate(apiValidator.email), apiController.createEmail);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;