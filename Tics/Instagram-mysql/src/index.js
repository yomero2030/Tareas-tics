const express = require ('express');
const  morgan = require ('morgan');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const expresshbs = require('express-handlebars');
const app = express();


//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
///midelwares 
app.use(morgan('dev'));
// global variables
// rutas

app.use(require('./routes/rutasIndex'));
app.use(require('./routes/authentication'));
app.use('links',require('./routes/links'));
//public

app.use(express.static(path.join(__dirname, 'public')));
// encender servidor
app.listen(app.get('port'),() => {
    console.log('servidor en el puerto', app.get('port'));
})