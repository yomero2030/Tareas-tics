const express = require('express');
 const  rutas = express.Router();

 const pool =  requiere('../database');
 const { isLoggedIn } = require('../lib/auth');

 router.get('/add', (req, res) => {
     res.render('links/add');
 });


 router.post('/add', async (req, res) => {
    const { nombre, apodo, contraseña } = req.body;
    const newLink = {
        nombre,
        apodo,
        contraseña,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});


 module.exports = rutas;