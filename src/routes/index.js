const express = require('express');
const app = express();

app.use(require('./auth'));
app.use(require('./contribuyente'));
app.use(require('./tipo_contribuyente'));
app.use(require('./tipo_documento'));

module.exports = app;