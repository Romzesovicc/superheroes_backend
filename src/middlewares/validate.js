import Joi from '@hapi/joi';
import { badRequest } from '@hapi/boom';

import { errorWrap } from '../helpers';

// request validation middleware
export default function (schema) {
  return errorWrap(async (req, res, next) => {
    if (typeof schema.params === 'object') {
      const validation = typeof schema.params.validate === 'function'
        ? schema.params.validate(req.params, { abortEarly: false })
        : Joi.object(schema.params).validate(req.params, { abortEarly: false });
      if (validation.error) {
        throw badRequest('Invalid params', validation.error.details);
      }
      req.params = validation.value;
    }

    if (typeof schema.query === 'object') {
      const validation = typeof schema.query.validate === 'function'
        ? schema.query.validate(req.query, { abortEarly: false })
        : Joi.object(schema.query).validate(req.query, { abortEarly: false });
      if (validation.error) {
        throw badRequest('Invalid query', validation.error.details);
      }
      req.query = validation.value;
    }

    if (typeof schema.body === 'object') {
      const validation = typeof schema.body.validate === 'function'
        ? schema.body.validate(req.body, { abortEarly: false })
        : Joi.object(schema.body).validate(req.body, { abortEarly: false });
      if (validation.error) {
        throw badRequest('Invalid query', validation.error.details);
      }
      req.body = validation.value;
    }

    if (schema.files) {
      const mainSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        size: Joi.number().required(),
        mimetype: Joi.string().required(),
        ...schema.files,
      }));

      const validation = Joi.validate(req.files, mainSchema, { abortEarly: false });
      if (validation.error) {
        throw badRequest(
          `Invalid file: ${validation.error.details[0].message}`,
          validation.error.details,
        );
      }
      req.files = validation.value;
    }

    next();
  });
}
