// Сервис работы с БД
const Contact = require("../schemas/contacts");

// Получаем все контакты
const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

// Находит контакт по id
const getContactById = async (id) => {
  const contact = await Contact.findOne({ _id: id });
  return contact;
};

// Создает  новый контакт
const createContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contact.create({ name, email, phone, favorite });
  return newContact;
};

// Удаляет контакт
const removeContact = async (id) => {
  const contact = await Contact.findByIdAndRemove({ _id: id });
  return contact;
};

// Обновляет контакт
const updateContact = async (id, body) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  return updatedContact;
};

// Обновляет статус контакт (set под вопросом!)
const updateContactStatus = async (id, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: id },
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
