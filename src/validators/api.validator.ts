import { Joi } from 'celebrate';

export default {
  email: {
    body: Joi.object().keys({
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      content: Joi.string().required()
    })
  },

  queryEmail: {
    params: {
      id: Joi.string().required()
    }
  }
}