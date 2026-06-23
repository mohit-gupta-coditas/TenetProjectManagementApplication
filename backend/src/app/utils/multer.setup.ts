import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd + '/uploads/files');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + '-' + Math.round(Math.random()*100000));
  }
});


export const uploads = multer({
  storage,
  limits: {
    fileSize: 1024*1024*5
  }
});