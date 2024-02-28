const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mainRouter = require("./routes/index")
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter)


app.listen(process.env.PORT, () => { console.log(`server listening on port ${process.env.PORT}`) })
//app.listen(4000, () => { console.log(`server listening on port 4000`) })

module.exports = app;