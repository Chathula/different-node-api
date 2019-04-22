import cron from 'node-cron';
import { timeZone as timezone, cronTime } from '../config';
import { sendEmail } from '../helpers';
import EmailModel, { Email } from '../models/Email';

export const sendQueuedEmail = () : void => {
  cron.schedule(cronTime, async () => {
    const queuedEmails : Array<Email> = await EmailModel.find({ status: { $in :['QUEUED', 'FAILED'] } });
    for (const email of queuedEmails) {
      const emailSent : boolean = await sendEmail(email.to, email.subject, email.content);
      await EmailModel.updateOne({ _id: email._id }, { status: (emailSent) ? 'SENT' : 'FAILED' });
    }
  }, {
    scheduled: true,
    timezone
  });
};