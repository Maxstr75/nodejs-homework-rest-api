const Joi = require("joi");

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
});

// Схема валидации обновления контакта
const putContactSchema = Joi.object({
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
}).min(1);

// Обработка ошибок валидации
const validate = (schema, res, obj, next) => {
  const validationLogs = schema.validate(obj);
  if (validationLogs.error) {
    return res
      .status(400)
      .json({ message: validationLogs.error.message.replace(/"/g, "") });
  }
  next();
};

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(addContactSchema, res, req.body, next);
  },
  putContactValidation: (req, res, next) => {
    return validate(putContactSchema, res, req.body, next);
  },
};
