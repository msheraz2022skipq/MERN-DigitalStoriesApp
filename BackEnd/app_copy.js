const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dateFormat = require('date-format');
const morgan = require('morgan');
const path = require("path")
const connectDB = require("./db/connectDB.js");
const storyRouter = require('./DigitalStories/index.js')
require('dotenv').config();
const app = express();
morgan.token('time', () => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date())); // Both morgan and log4js are configured to same date format, so that log reading is meaningful and not confusing due to different date formats
app.use(express.static('uploads'));
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
app.use(bodyParser({limit:'50mb'}))
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const multer = require("multer");
const fs = require("fs");
const createUserFolder = (userId) => {
  const userFolder = `./uploads/${userId}`;
  if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
      fs.mkdirSync(`${userFolder}/images`);
      fs.mkdirSync(`${userFolder}/videos`);
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Inside storage: ", req.body.author);
      createUserFolder(req.body.author);
      if (file.mimetype.startsWith('image/')) {
          cb(null, `./uploads/${req.body.author}/images`);
      } else if (file.mimetype.startsWith('video/')) {
          cb(null, `./uploads/${req.body.author}/videos`);
      }
  },
  filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // accept only image and video files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/PNG" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});
app.use(upload.single("file"))
connectDB(process.env.DATABASE_URL)

app.use('/', storyRouter)
app.listen(process.env.PORT, () => {
    console.log("backend started at port "+process.env.PORT)
})