const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//Inicializaciones
const app = express();

//Settings
app.set('port', 3000);

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

//Inicio del servidor
app.listen(3000, app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'))
});

