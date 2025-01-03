const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const insertProduct = require('./models/product'); 
const connection = require('./connect');
const productRouter = require('./routes/product');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`/products`, productRouter);

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
