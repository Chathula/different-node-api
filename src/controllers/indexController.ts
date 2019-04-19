import { Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) : object {
        return res.json({
            status: true, 
            message: "Welcome to different API"
        });
    }

}

export const indexController = new IndexController();