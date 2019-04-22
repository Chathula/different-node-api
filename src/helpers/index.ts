import moment from 'moment-timezone';
import sgMail from '@sendgrid/mail';
import { timeFormat, currentTime, startTime, endTime, SENDGRID_API_KEY, fromEmail as from } from '../config'

interface emailContent {
  to: string,
  from: string, 
  subject: string,
  text: string
}

// Here used the same database for all the environments for testing purpose
export const getMongoUrl = () : object => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return { URI: "mongodb://different:different123@ds145146.mlab.com:45146/different-node-api" };
        case 'production':
            return { URI: "mongodb://different:different123@ds145146.mlab.com:45146/different-node-api" };
        case 'test':
            return { URI: "mongodb://different:different123@ds145146.mlab.com:45146/different-node-api" };
        default:
            { URI: '' };
    }
};

export const checkSendingTime = (timeNow : moment = currentTime) : boolean => {
  const startingTime : moment = moment(startTime, timeFormat);
  const endingTime : moment = moment(endTime, timeFormat);

  return (timeNow.isBetween(startingTime, endingTime) || timeNow.isSame(startingTime) || timeNow.isSame(endingTime)) ? true : false;
}

export const sendEmail = async (to : string, subject : string, text : string) : Promise<boolean> => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  try {
    const emailContent : emailContent = {
      to,
      from,
      subject,
      text,
    };

    await sgMail.send(emailContent);
    return true;
  } catch (err) {
    return false;
  }

}