// Мидлвар для валидации
const Joi = require("joi");
const { SubTypes } = require("../helpers/constants");
// Схема валидации регистрации и логина юзера
const regLogUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua", "ru", "gov", "ca"] },
    })
    .required(),
  password: Joi.string()
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .required(),
  subscription: Joi.string().default(SubTypes.STARTER),
});
//  Пояснения пароля:
// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 символов.

// Схема валидации обновления подписки
const schemaSubscriptionUser = Joi.object({
  subscription: Joi.any()
    .valid(SubTypes.STARTER, SubTypes.PRO, SubTypes.BUSINESS)
    .required(),
});

// Схема валидации верификации юзера
const schemaReVerifyUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua", "ru", "gov", "ca"] },
    })
    .required(),
});

// Мидлвар для обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res
      .status(400)
      .json({ message: validationBody.error.message.replace(/"/g, "") });
  }
  next();
};

module.exports = {
  regLogValidation: (req, res, next) => {
    return validate(regLogUserSchema, res, req, next);
  },
  subscriptionValidation: (req, res, next) => {
    return validate(schemaSubscriptionUser, res, req, next);
  },
  reVerifyValidation: (req, res, next) => {
    return validate(schemaReVerifyUser, res, req, next);
  },
};
