// Контроллеры - прописываю логику обработки  маршрута

// Импорт функций для работы с локальной базой данных (json файлом)
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

// Вызываем функцию listContacts для работы с json-файлом contacts.json
const getContacts = async (reg, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "Success" });
  } catch (error) {
    next(error);
  }
};

// Получение контакт по id
const getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contact, status: "Success" });
  } catch (error) {
    next(error);
  }
};

// Создание контакта
const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    if (!contact) {
      return res.status(400).json({ message: "missing required name field" });
    }
    res.status(201).json({ contact, status: "Success" });
  } catch (error) {
    next(error);
  }
};

// Удаление контакта
const deleteContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

// Обновление контакта
const putContact = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
      return res.status(400).json({ message: "missing fields" });
    } else if (contact) {
      return res.status(200).json({ contact, status: "Success" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  putContact,
};
