import moment from 'moment-timezone';
import { getMongoUrl } from '../helpers';

export const mongodb : any = getMongoUrl();

export const SENDGRID_API_KEY : string = new Buffer('U0cuR2RtWEVjNE1Tb21jTGxYS3M5Tl9DQS53bW9CU0Q0MHcyWkFseW9EeXNiazRHMVo0SWNiNnA0c2QzTkdGSFYtM09J', 'base64').toString('ascii') || process.env.SENDGRID_API_KEY;
export const fromEmail : string = 'different-email@gmail.com';

export const timeZone : string = 'Australia/Sydney';
export const timeFormat : string = 'hh:mm:ss';
export const startTime : string = '08:00:00';
export const endTime : string = '17:00:00';
export const currentTime : moment = moment(moment.tz(new Date(), timeZone).format(timeFormat), timeFormat);
export const cronTime : string = '0 8 * * *';