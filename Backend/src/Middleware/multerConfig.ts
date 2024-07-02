import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadType = req.body.category;
    let uploadPath = "uploads/";

    if (uploadType) {
      uploadPath += "products/";
    } else {
      uploadPath += "users/";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
