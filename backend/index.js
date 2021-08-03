if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//Inicializaciones
const app = express();
require('./database')

//Settings
app.set('port', process.env.PORT || 3000);

//Middelwares
app.use(morgan('dev'));
const storage =  multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //Interpretar los datos de los form como .json
app.use(express.json()); //Que permita entender las peticiones ajax, solo json

//Routes
app.use('/api/books', require('./routes/books'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Inicio del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'))
});

