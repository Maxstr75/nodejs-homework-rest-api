// Сервис работы с БД
const Contact = require("../models/contacts");

// Получаем все контакты
const getAllContacts = async (userId, query) => {
  const {
    page = 1,
    limit = 20,
    offset = (page - 1) * limit,
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
  } = query;

  const params = { owner: userId };

  if (favorite !== null) {
    params.favorite = favorite;
  }

  const result = await Contact.paginate(params, {
    page,
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: { path: "owner", select: "email subscription" },
  });

  const { docs: contacts, totalDocs: total, totalPages } = result;

  return {
    contacts,
    total,
    totalPages,
    page: Number(page),
    limit: Number(limit),
    offset: Number(offset),
  };
};

// Находит контакт по id
const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate("owner", "email subscription");
  return contact;
};

// Создает  новый контакт
const createContact = async (userId, body) => {
  const newContact = await Contact.create({ ...body, owner: userId });
  return newContact;
};

// Удаляет контакт
const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

// Обновляет контакт
const updateContact = async (userId, contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  ).populate("owner", "email subscription ");
  return updatedContact;
};

// Обновляет статус контакт (set под вопросом!)
const updateContactStatus = async (userId, contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    { new: true }
  ).populate("owner", "email subscription ");
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
