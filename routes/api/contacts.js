const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validation");

const ctrlWrapper = require("../../helpers/ctrlWrapper");

// Роут для поиска всех контактов
router.get("/", ctrlWrapper(getContacts));

// Роут поиска контакта по id
router.get("/:contactId", ctrlWrapper(getContactsById));

// Роут для создания контакта
router.post("/", addContactValidation, ctrlWrapper(addContacts));

// Роут для удаления контакта
router.delete("/:contactId", ctrlWrapper(deleteContact));

// Роут для обновления контактов
router.put("/:contactId", putContactValidation, ctrlWrapper(putContact));

module.exports = router;
