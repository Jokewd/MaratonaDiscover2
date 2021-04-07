const express = require("express")
const path = require("path")
const routes = require("./routes")
const bodyParser = require("body-parser")
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

const server = express()
const sessionStore = new session.MemoryStore;

//template engine
server.set("view engine", "ejs")
server.set('views', path.join(__dirname, 'views/'));

//static files
server.use(express.static("public/"))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(cookieParser('secret'));
server.use(session({
	cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
server.use(flash());

//routes
server.use(routes)

server.listen(3000, () => {
	console.log('Server is running...')
})