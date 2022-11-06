//Importing dependencies
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Importing routes/helpers
const routes = require('./controllers');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESS_SEC,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});