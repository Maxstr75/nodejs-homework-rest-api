// Контроллеры - прописываю логику обработки  маршрута

// Импорт функций для работы с локальной базой данных (json файлом)

const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require("../models");

// Вызываем функцию listContacts для работы с json-файлом contacts.json
const getContacts = async (reg, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "Success" });
  } catch (error) {
    next(error);
  }
};

// Получаем контакт по id
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

module.exports = {
  getContacts,
  getContactsById,
};
