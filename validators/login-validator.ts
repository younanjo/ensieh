import Joi from '@hapi/joi';

export const schema = Joi.object()
  .keys({
    username: Joi.string().trim(),
    password: Joi.string().trim(),
  })
  .required()
  .prefs({
    convert: true,
    abortEarly: false,
    noDefaults: true,
    presence: 'required',
    stripUnknown: true,
  });

export default (payload: any): Joi.ValidationResult => {
  return schema.validate(payload);
};
