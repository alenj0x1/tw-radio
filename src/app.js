const baseRoutes = require('./routes/base.routes');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

// middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/', baseRoutes);

module.exports = {
  app,
};
