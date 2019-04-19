import { Request, Response } from 'express';
import moment from 'moment-timezone';
import EmailModel, { Email } from '../models/Email';
import { timeZone, timeFormat, startTime, endTime } from '../config'

class ApiController {

    public async createEmail(req: Request, res: Response) {
        const { to, subject, content } = req.body;

        const currentTime = moment(moment.tz(new Date(), timeZone).format(timeFormat), timeFormat);
        const startingTime = moment(startTime, timeFormat);
        const endingTime = moment(endTime, timeFormat);

        let status : string = 'QUEUED';

        if (currentTime.isBetween(startingTime, endingTime) || currentTime.isSame(startingTime) || currentTime.isSame(endingTime)) {
            console.log("send mail");
        } else {
            console.log("don't send mail");
        }
        return;

        const newEmail: Email = new EmailModel({
            to,
            subject,
            content
        })

        const emailResponse : Email = await newEmail.save();
        return res.json(emailResponse);
    }

}

export default new ApiController();