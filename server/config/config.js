//============================
//Puerto
//============================
process.env.PORT = process.env.PORT || 3000;


//============================
//Entorno
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//============================
//Entorno
//============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://aiperios:EMtEYeupxNVsAyDN@node-cafe-db-i14i8.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;