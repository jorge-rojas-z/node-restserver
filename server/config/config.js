//============================
//Puerto
//============================
process.env.PORT = process.env.PORT || 3000;


//============================
//Entorno
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//============================
//Vencimiento del Token
//============================
// 60 seg * 60 min * 24 hrs * 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//============================
//SEED de autentificacion
//============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//============================
//Base de datos
//============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


//============================
//Google Client
//============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '453851469481-81jfgtknocnfqd54rpopmq3905hucb29.apps.googleusercontent.com'