const multer = require("multer");
const path =  require('path')

const storageEngine = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null,  `${Date.now()}--${file.originalname}`);
  },
});

// const upload = multer({
//   storage: storageEngine,
//   limits: { fileSize: 1000000 },
// });


// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public")},
  filename: (req, file, cb) => {
    cb(null,  `${Date.now()}--${file.originalname}`);
  },
  });
  
  // Initialize upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // limit file size to 1MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }) .fields([
      {
        name: "file1",
        maxCount: 1,
      },
      {
        name: "file2",
        maxCount: 1,
      },
    ]);

  function checkFileType(file, cb) {
    // Allowed filetypes
    const filetypes = /jpeg|jpg|png|pdf|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only or pdf is alloed!');
    }
  }
module.exports = { upload };
