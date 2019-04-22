import { describe, it } from 'mocha';
import { expect } from 'chai';
import moment from 'moment-timezone';
import request from 'supertest';
import app from '../src/index';
import { timeFormat } from '../src/config';
import { checkSendingTime, sendEmail } from '../src/helpers';

describe('Check Helper methods', async () => {
  
  it('check correct sending time between 8AM to 5PM', () => {
    const currentTime : moment = moment('09:00:00', timeFormat);

    expect(checkSendingTime(currentTime)).to.equal(true);

  });

  it('check queuing time between 8AM to 5PM', () => {
    const currentTime : moment = moment('18:00:00', timeFormat);

    expect(checkSendingTime(currentTime)).to.equal(false);

  });

  it('verify email sending works', async () => {
    const emailSent : boolean = await sendEmail('fantastic@different.com.au', 'Sample Email', 'Testing sample email sending');

    expect(emailSent).to.equal(true);

  });

});

describe('Check API methods', () => {

  let id : string;
  const mockData : object = {
    to: 'fantastic@different.com.au',
    subject: "sample test",
    content: "check integration testing"
  };
  
  it('create new email without any fields', async () => {
    const createEmail = await request(app).post('/v1/emails');
    
    expect(createEmail.status).to.equal(400);
  });

  it('create new email with all required fields', async () => {
    const createEmail = await request(app).post('/v1/emails')
      .send(mockData);
    
    id = createEmail.body.id;

    expect(createEmail.status).to.equal(200);
  });

  it('fetch existing email data', async () => {
    const fetchEmail = await request(app).get(`/v1/emails/${id}`);
    
    expect(fetchEmail.status).to.equal(200);
  });

  it('delete existing email data', async () => {
    const deleteEmail = await request(app).delete(`/v1/emails/${id}`);
    
    expect(deleteEmail.status).to.equal(200);
  });

  it('fetch non existing email data', async () => {
    const fetchEmail = await request(app).get(`/v1/emails/${id}`);
    
    expect(fetchEmail.status).to.equal(404);
  });

  it('delete non existing email data', async () => {
    const deleteEmail = await request(app).delete(`/v1/emails/${id}`);
    
    expect(deleteEmail.status).to.equal(404);
  });

});