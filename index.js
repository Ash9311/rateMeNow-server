const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require("./routes/index")
const bodyParser = require('body-parser');
const { PORT } = require('./config/config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter)

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));