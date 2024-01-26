const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config/config');

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));