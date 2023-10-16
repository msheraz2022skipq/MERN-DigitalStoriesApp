const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dateFormat = require('date-format');
const morgan = require('morgan');
const connectDB = require("./db/connectDB.js");
const storyRouter = require('./DigitalStories/index.js')
const {uploadS3} = require('./uploadMiddleware')
require('dotenv').config();

const app = express();
morgan.token('time', () => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date())); // Both morgan and log4js are configured to same date format, so that log reading is meaningful and not confusing due to different date formats
// app.use(express.static('uploads'));
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
app.use(bodyParser({limit:'50mb'}))
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(uploadS3.single("file"))
connectDB(process.env.DATABASE_URL)

app.use('/', storyRouter)
app.listen(process.env.PORT, () => {
    console.log("backend started at port "+process.env.PORT)
})

module.exports = app