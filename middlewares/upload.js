const multer = require("multer");
const path = require("path");

// Создаем временное хранилище файла
const tempDir = path.join(__dirname, "../", "temp");
// console.log(__dirname);
const multerConfig = multer.diskStorage({
  destination: tempDir, // Путь к временному файлу
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Под каким именем сохраняем файл
  },
  limits: {
    fileSize: 2048, // Ограничение загрузки файла
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
