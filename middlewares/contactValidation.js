// Мидлвар для валидации
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Схема валидации создания контакта
const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua", "gov"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

// Схема валидации обновления контакта
const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua", "gov"] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

// Схема валидации обновления статуса контакта
const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// Схема валидации Id документа
const schemaId = Joi.object({
  contactId: Joi.objectId(),
});

// Мидлвар обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);
  if (validationBody.error) {
    return res
      .status(400)
      .json({ message: validationBody.error.message.replace(/"/g, "") });
  }
  next();
};

// Мидлвар обработки ошибок валидации Id
const validateId = (schema, res, req, next) => {
  const validationID = schema.validate(req.params);
  if (validationID.error) {
    return res
      .status(400)
      .json({ message: validationID.error.message.replace(/"/g, "") });
  }
  next();
};

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(addContactSchema, res, req, next);
  },
  updateContactValidation: (req, res, next) => {
    return validate(updateContactSchema, res, req, next);
  },
  updateContactStatusValidation: (req, res, next) => {
    return validate(updateContactStatusSchema, res, req, next);
  },
  idValidation: (req, res, next) => {
    return validateId(schemaId, res, req, next);
  },
};
