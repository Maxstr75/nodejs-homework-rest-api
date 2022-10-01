// Сервис работы с БД
const Contact = require("../models/contacts");

// Получаем все контакты
const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

// Находит контакт по id
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

// Создает  новый контакт
const createContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contact.create({ name, email, phone, favorite });
  return newContact;
};

// Удаляет контакт
const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

// Обновляет контакт
const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

// Обновляет статус контакт (set под вопросом!)
const updateContactStatus = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateContactStatus,
};
