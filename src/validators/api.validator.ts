import Joi from 'joi';

export default {
  email: {
    body: {
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      content: Joi.string().required()
    }
  }
}