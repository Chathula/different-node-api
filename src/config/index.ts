import moment from 'moment-timezone';
import { getMongoUrl } from '../helpers';

export const mongodb : any = getMongoUrl();

export const SENDGRID_API_KEY : string = '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' || process.env.SENDGRID_API_KEY;
export const fromEmail : string = 'schathula@gmail.com';

export const timeZone : string = 'Australia/Sydney';
export const timeFormat : string = 'hh:mm:ss';
export const startTime : string = '08:00:00';
export const endTime : string = '17:00:00';
export const currentTime : moment = moment(moment.tz(new Date(), timeZone).format(timeFormat), timeFormat);
export const cronTime : string = '0 8 * * *';