import path from "path";
import express from "express";
import multer from "multer";
import jimp from "jimp";
// import watermark from "jimp-watermark";
// import Model from "../models/modelModel.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
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
    cb("Images only!", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  if (req.body.name.includes("private")) {
    // const model = await Model.findById(req.body.id).exec();
    // if (model.watermarkImage) {
    //   watermark.addWatermark(
    //     req.file.path,
    //     `${path.resolve()}${model.watermarkImage}`,
    //     {
    //       ratio: 0.2,
    //       opacity: 0.2,
    //       dstPath: req.file.path,
    //     }
    //   );
    // } else if (model.watermarkText) {
    //   console.log("text", model.watermarkText);
    //   watermark.addTextWatermark(req.file.path, {
    //     text: model.watermarkText,
    //     textSize: 6,
    //     dstPath: req.file.path,
    //   });
    // } else {
    //   console.log("sike!");
    // }
    jimp
      .read(req.file.path)
      .then((tpl) =>
        jimp.read("uploads/watermark.png").then((logoTpl) => {
          logoTpl.opacity(0.5);
          return tpl.composite(logoTpl, 512, 512, [
            jimp.BLEND_DESTINATION_OVER,
          ]);
        })
      )
      .then((tpl) => tpl.write(req.file.path));
  }
  res.send(`/${req.file.path}`);
});

export default router;
