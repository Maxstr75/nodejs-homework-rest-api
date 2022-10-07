const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  updateContacts,
  updateContactsStatus,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
  idValidation,
} = require("../../middlewares/contactValidation");
const { authenticate } = require("../../middlewares/authenticate");

const ctrlWrapper = require("../../helpers/сtrlWrapper");

// Роут для списка всех контактов
router.get("/", ctrlWrapper(getContacts));

// Роут поиска контакта по id
router.get("/:contactId", idValidation, ctrlWrapper(getContactsById));

// Роут для создания контакта
router.post("/", authenticate, addContactValidation, ctrlWrapper(addContacts));

// Роут для удаления контакта
router.delete("/:contactId", idValidation, ctrlWrapper(deleteContact));

// Роут для обновления контактов
router.patch(
  "/:contactId",
  idValidation,
  updateContactValidation,
  ctrlWrapper(updateContacts)
);

// Роут для статуса контакта
router.patch(
  "/:contactId/favorite",
  idValidation,
  updateContactStatusValidation,
  ctrlWrapper(updateContactsStatus)
);
module.exports = router;
