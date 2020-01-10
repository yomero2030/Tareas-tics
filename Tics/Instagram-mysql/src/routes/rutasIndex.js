const express = require('express');
 const  rutas = express.Router();

 rutas.get('/',(req, res) => {
    res.send('hola mundo');
 });

 module.exports = rutas;