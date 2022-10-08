// Контроллеры - прописываю логику обработки  маршрута

// Импорт функций для работы с локальной базой данных (json файлом)
const {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../services/contactsServices");

// Вызываем функцию listContacts для работы с json-файлом contacts.json
const getContacts = async (req, res) => {
  console.log(req.query);
  const contacts = await getAllContacts(req.user.id, req.query);
  res.status(200).json({ ...contacts, status: "Success" });
};

// Получение контакт по id
const getContactsById = async (req, res) => {
  const contact = await getContactById(req.user.id, req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact, status: "Success" });
};

// Создание контакта
const addContacts = async (req, res) => {
  const contact = await createContact(req.user.id, req.body);

  if (!contact) {
    return res.status(400).json({ message: "missing required name field" });
  }
  res.status(201).json({ contact, status: "Success" });
};

// Удаление контакта
const deleteContact = async (req, res) => {
  const result = await removeContact(req.user.id, req.params.contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

// Обновление контакта
const updateContacts = async (req, res) => {
  const contact = await updateContact(
    req.user.id,
    req.params.contactId,
    req.body
  );

  if (!contact) {
    return res.status(400).json({ message: "missing fields" });
  } else if (contact) {
    return res.status(200).json({ contact, status: "Success" });
  }
  res.status(404).json({ message: "Not found" });
};

// Обновление статуса контакта
const updateContactsStatus = async (req, res) => {
  const contact = await updateContactStatus(
    req.user.id,
    req.params.contactId,
    req.body
  );

  if (!contact) {
    return res.status(400).json({ message: "missing fields" });
  } else if (contact) {
    return res.status(200).json({ contact, status: "Success" });
  }
  res.status(404).json({ message: "Not found" });
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  updateContacts,
  updateContactsStatus,
};
