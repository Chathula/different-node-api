import { Request, Response } from 'express';
import moment from 'moment-timezone';
import EmailModel, { Email } from '../models/Email';
import { checkSendingTime, sendEmail } from '../helpers';

class ApiController {

    public async createEmail(req: Request, res: Response) {
        const { to, subject, content } = req.body;

        let status : string = 'QUEUED';

        if (checkSendingTime()) {
            const emailSent : boolean = await sendEmail(to, subject, content);
            status = (emailSent) ? 'SENT' : 'FAILED';
        } 

        const newEmail: Email = new EmailModel({
            to,
            subject,
            content,
            status
        });

        const emailResponse : Email = await newEmail.save();
        return res.json(emailResponse);
    }

    public async fetchEmail(req: Request, res: Response) {
        try {
            const emailData : Email = await EmailModel.findOne({ _id: req.params.id });
            if (emailData !== null) {
                return res.json(emailData);
            }
            
            return res.status(404).json({ error: 'Email data not found' });
        } catch (err) {
            return res.status(404).json({ error: 'Email data not found' });
        }
        
    }

    public async deleteEmail(req: Request, res: Response) {
        try {
            const emailData : any = await EmailModel.deleteOne({ _id: req.params.id });
            if (emailData.n > 0) {
                return res.status(200).json({ id: req.params.id, deleted: (emailData.ok == 1) ? true : false });
            }
            
            return res.status(404).json({ error: 'Email data not found' });
        } catch (err) {
            return res.status(404).json({ error: 'Email data not found' });
        }
        
    }
 
}

export default new ApiController();