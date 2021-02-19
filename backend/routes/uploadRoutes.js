const path = require('path');
const express = require('express');
const multer = require('multer');
const jimp = require('jimp');
// import watermark from "jimp-watermark";
// import Model from "../models/modelModel.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'backend/uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!', false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  // if (req.body.name.includes("private")) {
  // const model = await Model.findById(req.body.id).exec();
  //   jimp
  //     .read(req.file.path)
  //     .then((tpl) =>
  //       jimp.read("uploads/watermark.png").then((logoTpl) => {
  //         logoTpl.opacity(0.5);
  //         return tpl.composite(logoTpl, 512, 512, [
  //           jimp.BLEND_DESTINATION_OVER,
  //         ]);
  //       })
  //     )
  //     .then((tpl) => tpl.write(req.file.path));
  // }
  console.log(req.file.path);
  res.send(`/${req.file.path}`);
});

module.exports = router;
