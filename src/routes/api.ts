import { celebrate } from 'celebrate';
import apiValidator from '../validators/api.validator';
import { Router } from 'express';
import apiController from '../controllers/ApiController';

class ApiRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/emails', celebrate(apiValidator.email), apiController.createEmail);
        this.router.get('/emails/:id', celebrate(apiValidator.queryEmail), apiController.fetchEmail);
        this.router.delete('/emails/:id', celebrate(apiValidator.queryEmail), apiController.deleteEmail);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;