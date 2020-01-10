console.log("hola mundo")
// Crear aplicación express
var express = require ("express")

var app  = express () 
var db = require ("./database.js")
var md5 = require("md5")
var  cors  = require ('cors') 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Puerto de servicio
var HTTP_PORT = 8000
// Iniciar servidor

// Punto final de la raíz
//crear usurario
app.post("/api/v1/user/create", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if(!req.body.telefono){
        errors.push("No telefono specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        telefono: req.body.telefono,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, telefono, password) VALUES (?,?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    }); 
})
//get users
app.get ("/", (req, res, next) => {
    res.json ({"mensaje": "Ok"})
});



//delete usuarios 
 
app.delete("/api/v1/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// update
app.patch("/api/v1/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        telefono: req.body.telefono,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           telefono = COALESCE(?,telefono), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.telefono, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})



// Inserte aquí otros puntos finales API
app.get("/api/v1/user", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// Respuesta predeterminada para cualquier otra solicitud
app.use (function (req, res) {
    res.status (404);
});

app.listen ( HTTP_PORT , () => {
    console.log ("Servidor que se ejecuta en el puerto: %PORT%")
});