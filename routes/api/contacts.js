const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");

// Роут для поиска всех контактов
router.get("/", getContacts);

// Роут поиска контакта по id
router.get("/:contactId", getContactsById);

// Роут для создания контакта
router.post("/", addContacts);

// Роут для удаления контакта
router.delete("/:contactId", deleteContact);

// Роут для обновления контактов
router.put("/:contactId", putContact);

module.exports = router;
